<!doctype html>
<html id="theme">
    <head>
        <title><?php echo e($settings->get('branding.site_name')); ?></title>

        <base href="<?php echo e($htmlBaseUri); ?>">

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,400italic' rel='stylesheet' type='text/css'>
        <link rel="icon" type="image/x-icon" href="<?php echo e($settings->get('branding.favicon')); ?>">

        <?php echo $__env->yieldContent('angular-styles'); ?>

        
        <?php if($settings->get('branding.use_custom_theme')): ?>
            <link rel="stylesheet" href="<?php echo e(asset('storage/appearance/theme.css')); ?>">
        <?php endif; ?>
        

        <?php if($settings->has('custom_code.css')): ?>
            <style><?php echo $settings->get('custom_code.css'); ?></style>
        <?php endif; ?>
	</head>

    <body>
        <app-root></app-root>

        <script>
            window.bootstrapData = "<?php echo $bootstrapData; ?>";
        </script>

        <?php echo $__env->yieldContent('angular-scripts'); ?>

        <?php if($settings->has('custom_code.js')): ?>
            <script><?php echo $settings->get('custom_code.js'); ?></script>
        <?php endif; ?>

        <?php if($code = $settings->get('analytics.tracking_code')): ?>
            <script>
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                ga('create', '<?php echo e($settings->get('analytics.tracking_code')); ?>', 'auto');
                ga('send', 'pageview');
            </script>
        <?php endif; ?>
	</body>
</html>