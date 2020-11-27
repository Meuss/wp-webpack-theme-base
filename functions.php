<?php
// load wpack.io
require_once __DIR__ . '/vendor/autoload.php';
$enqueue = new \WPackio\Enqueue( 'wpWebpackThemeBase', 'dist', '1.0.0', 'theme', false, 'regular' );

// try to keep this file clean, import php files from /includes
require_once(__DIR__ . '/includes/script-enqueues.php');