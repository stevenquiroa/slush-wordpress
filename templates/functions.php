<?php
/**
 * <%= appName %> functions and definitions
 *
 * When using a child theme (see http://codex.wordpress.org/Theme_Development and
 * http://codex.wordpress.org/Child_Themes), you can override certain functions
 * (those wrapped in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before the parent
 * theme's file, so the child theme functions would be used.
 *
 * @package <%= appName %>
 * @since <%= appVersion %>
 */
 
 // Useful global constants
define( '<%= appNameSlugUPPER %>_VERSION', '<%= appVersion %>' );
 
 /**
  * Set up theme defaults and register supported WordPress features.
  *
  * @uses load_theme_textdomain() For translation/localization support.
  *
  * @since <%= appVersion %>
  */
 function <%= appNameSlug %>_setup() {
	/**
	 * Makes <%= appName %> available for translation.
	 *
	 * Translations can be added to the /lang directory.
	 * If you're building a theme based on <%= appName %>, use a find and replace
	 * to change '<%= appNameSlug %>' to the name of your theme in all template files.
	 */
	load_theme_textdomain( '<%= appNameSlug %>', get_template_directory() . '/languages' );
 }
 add_action( 'after_setup_theme', '<%= appNameSlug %>_setup' );
 
 /**
  * Enqueue scripts and styles for front-end.
  *
  * @since <%= appVersion %>
  */
 function <%= appNameSlug %>_scripts_styles() {
	$postfix = ( defined( 'SCRIPT_DEBUG' ) && true === SCRIPT_DEBUG ) ? '' : '.min';

	wp_enqueue_script( 'jquery' );

	//getting vendors scripts and styles
	wp_enqueue_script( 'vendor', get_template_directory_uri() . "/assets/js/vendor.js", array(), <%= appNameSlugUPPER %>_VERSION, true );

	wp_enqueue_style( 'vendor', get_template_directory_uri() . "/assets/css/vendor.css", array(), <%= appNameSlugUPPER %>_VERSION );

	wp_enqueue_script( '<%= appNameSlug %>', get_template_directory_uri() . "/assets/js/theme{$postfix}.js", array('jquery', 'vendor'), <%= appNameSlugUPPER %>_VERSION, true );
		
	wp_enqueue_style( '<%= appNameSlug %>', get_template_directory_uri() . "/assets/css/theme{$postfix}.css", array(), <%= appNameSlugUPPER %>_VERSION );
 }
 add_action( 'wp_enqueue_scripts', '<%= appNameSlug %>_scripts_styles' );
 
 /**
  * Add humans.txt to the <head> element.
  */
 function <%= appNameSlug %>_header_meta() {
	$humans = '<link type="text/plain" rel="author" href="' . get_template_directory_uri() . '/humans.txt" />';
	
	echo apply_filters( '<%= appNameSlug %>_humans', $humans );
 }
 add_action( 'wp_head', '<%= appNameSlug %>_header_meta' );

/**
 * Adding thumbnails support
 */
 add_theme_support( 'post-thumbnails' );