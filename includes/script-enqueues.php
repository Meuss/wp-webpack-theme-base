<?php

class MyThemeInit {
	/**
	 * @var \WPackio\Enqueue
	 */
	public $enqueue;

	public function __construct() {
		// It is important that we init the Enqueue class right at the plugin/theme load time
		$this->enqueue = new \WPackio\Enqueue(
			'wpWebpackThemeBase',
			'dist',
			'1.0.0',
			'theme',
      false,
      'regular' // change to 'child' if it's a child theme
		);
		// Enqueue a few of our entry points
    add_action('wp_enqueue_scripts', [ $this, 'enqueue_global' ] );
    add_action('wp_enqueue_scripts', [ $this, 'enqueue_homepage' ] );
	}
  // Enqueue global javascript
	public function enqueue_global() {
    $this->enqueue->enqueue( 'global', 'main', [] );
  }
  // enqueue script only on homepage
	public function enqueue_homepage() {
    if (is_front_page()) {
      $this->enqueue->enqueue( 'homepage', 'main', [] );
    }
	}
}

// Init
new MyThemeInit();