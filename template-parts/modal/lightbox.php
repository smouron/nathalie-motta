<?php
/**
 * Modal lightbox
 *
 * @package WordPress
 * @subpackage nathalie-motta theme
 */

 // Récupérer la taxonomie actuelle
 $term = get_queried_object();
 $term_id  = my_acf_load_value('ID', $term);

 $categorie  = my_acf_load_value('name', get_field('categorie-acf'));

?>
<!-- <a href="<?php the_permalink() ?>" alt="<?php the_title(); ?>" title="<?php the_title(); ?>">
    <?php the_post_thumbnail('large'); ?>    
</a> -->
<?php the_post_thumbnail('large'); ?>
<h2 class="photo-title-<?php the_id(); ?>"><?php the_title(); ?></h2>
<div class="lightbox__info flexrow">
     <p class="photo-category-<?php the_id(); ?>"><?php echo $categorie; ?></p>
    <p class="photo-year-<?php the_id(); ?>"><?php echo the_time( 'Y' ); ?></p>
</div> 



