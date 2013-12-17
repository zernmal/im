var $container = $('.picwp');
$container.imagesLoaded( function(){ 
    $container.masonry({itemSelector :'li'});
});