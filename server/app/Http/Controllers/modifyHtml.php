<?php
    require('simple_html_dom.php');

    //updatePublishedWebPages('/var/www/dilda');

    function updatePublishedWebPages($dir) {
        $files = scandir($dir);

        foreach($files as $file) {
            if ( sizeof(explode('.', $file)) == 2 ) {
                $arr = explode('.', $file);
                $file_name = $arr[0];
                $file_ext = $arr[1];

                if ( $file_ext == 'html' || $file_ext == '.htm') {
                    $file_name_with_path = $dir.'/'.$file;
                    //echo $file_name_with_path.PHP_EOL;
                    //$html = new simple_html_dom();

                    //$html->load_file($file_name_with_path);

                    $html = file_get_html($file_name_with_path);

                    //echo $html.PHP_EOL;
                    foreach($html->find('base') as $element) {
                      //echo $element->href.PHP_EOL;
                      $element->href = '/';
                    }

                    chmod($file_name_with_path, 0777);
                    file_put_contents($file_name_with_path, $html);
                }
            }
        }
    }
?>