<?php
/**
 * The header
 *
 * @package WordPress
 * @subpackage nathalie-motta
 */

?>
<!doctype html>
<html <?php language_attributes(); ?> >
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<header id="header">
		<h1>
			<?php 
				//  Affichage du titre du blog
				echo bloginfo('name');
			?>
		</h1>
		<nav id="navigation">
			<?php 
				// Affichage du menu main déclaré dans functions.php
				wp_nav_menu(array('theme_location' => 'main')); 
			?>
		</nav>
	</header>

