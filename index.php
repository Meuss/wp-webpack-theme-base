<?php
get_header();
?>

<main><h2>WordPress + Webpack</h2></main>

<!-- example using an inline svg -->
<div class="logos">
  <?php get_template_part('img/inline', 'wordpress.svg'); ?>
  <?php get_template_part('img/inline', 'webpack.svg'); ?>
</div>

<a href="https://github.com/Meuss/wp-webpack-theme-base">See on Github</a>

<?php
get_footer();
