<?php

namespace App\Http\Controllers;

use Zipper;
use Vebto\Bootstrap\Controller;
use App\Services\ProjectRepository;
require('modifyHtml.php');

class PublishProjectController extends Controller
{
    /**
     * @var ProjectRepository
     */
    private $projectRepository;

    /**
     * ProjectDownloadController constructor.
     *
     * @param ProjectRepository $projectRepository
     */
    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

 public function deleteDirectory($dir) {
         if (!file_exists($dir)) { return true; }

         if (!is_dir($dir) || is_link($dir)) {
             return unlink($dir);
         }

         foreach (scandir($dir) as $item) {
             if ($item == '.' || $item == '..') { continue; }

             if (!$this->deleteDirectory($dir . "/" . $item)) {
                 chmod($dir . "/" . $item, 0777);
                 if (!$this->deleteDirectory($dir . "/" . $item)) return false;
             }
         }

         return rmdir($dir);
     }

  public function recursive_copy($src,$dst) {
    $dir = opendir($src);
    @mkdir($dst);
    while(false !== ( $file = readdir($dir)) ) {
        if (( $file != '.' ) && ( $file != '..' )) {
            if ( is_dir($src . '/' . $file) ) {
                $this->recursive_copy($src . '/' . $file,$dst . '/' . $file);
            }
            else {
                copy($src . '/' . $file,$dst . '/' . $file);
            }
        }
    }
    closedir($dir);
  }

    /**
     * Download specified project as a .zip
     *
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function publish($id)
    {
        $project = $this->projectRepository->findOrFail($id);

        $this->authorize('download', $project);

        $source = config('filesystems.disks.public.root').'/'.$this->projectRepository->getProjectPath($project);

        $this->deleteDirectory('/var/www/'.$id);
        $this->deleteDirectory('/var/www/'.$project->name);
        mkdir('/var/www/'.$project->name);
        $this->recursive_copy($source, '/var/www/'.$project->name);

        updatePublishedWebPages('/var/www/'.$project->name);

        return $this->success(['url' => 'http://www.'.$project->name.'ccbizon.com']);
    }
}
