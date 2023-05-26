// Gestion de l'affichage des photos supplémentaires en page d'accueil
// en fonction de la valeur des filtres

if (!currentPage) {
  let currentPage = 1;
}

// Récupération des variables de PHP
let categorieId = document.getElementById("categorie_id").value;
let formatId = document.getElementById("format_id").value;
let order = "";
if (document.getElementById("order") !== null) {
  order = document.getElementById("order").value;
}
let orderby = "title";
if (document.getElementById("orderby") !== null) {
  orderby = document.getElementById("orderby").value;
}
let max_pages = 1;
if (document.getElementById("max_pages") !== null) {
  max_pages = document.getElementById("max_pages").valu;
}

// Gestion de la pagination des photos
(function ($) {
  $(document).ready(function () {
    // Gestion du bouton pour voir plus de photos
    $("#load-more").click(function (e) {
      // e.preventDefault();
      currentPage++; // Do currentPage + 1, because we want to load the next page
      // console.log("max_page: " + max_pages + " - currentPage: " + currentPage);

      if (currentPage >= max_pages) {
        $("#load-more").addClass("hidden");
      }

      $.ajax({
        type: "POST",
        url: "/nathalie-motta/wp-admin/admin-ajax.php",
        dataType: "html", // <-- Change dataType from 'html' to 'json'
        data: {
          action: "weichie_load_more",
          paged: currentPage,
          categorie: categorieId,
          format: formatId,
          orderby: orderby,
          order: order,
        },
        success: function (res) {
          $(".publication-list").append(res);
        },
      });
    });
  });
})(jQuery);