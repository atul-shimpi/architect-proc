<?php

namespace App\Http\Controllers;

use Zipper;
use Vebto\Bootstrap\Controller;
use App\Services\ProjectRepository;

class ProjectDownloadController extends Controller
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
    public function download($id)
    {
        $project = $this->projectRepository->findOrFail($id);

        $this->authorize('download', $project);

        $source = config('filesystems.disks.public.root').'/'.$this->projectRepository->getProjectPath($project);

        $this->deleteDirectory('/var/www/'.$id);
        $this->deleteDirectory('/var/www/'.$_GET['project_name']);
        mkdir('/var/www/'.$_GET['project_name']);
        $this->recursive_copy($source, '/var/www/'.$_GET['project_name']);




        $destination = "$source/$project->name.zip";

        //delete old project zip file
        if (file_exists($destination)) {
            unlink($destination);
        }

		
        //create a zip
        $files = glob($source);
        Zipper::make($destination)->add($files)->close();

        //download
        return response()->download($destination);
    }
}
