// Gestion de l'affichage des photos supplémentaires en page d'accueil
// en fonction de la valeur des filtres

document.addEventListener("DOMContentLoaded", function () {
  // Récupération des variables de PHP

  (function ($) {
    $(document).ready(function () {
      let currentPage = 1;

      // Gestion de la pagination des photos en page d'accueil
      $("#load-more").click(function (e) {
        e.preventDefault();

        // L'URL qui réceptionne les requêtes Ajax dans l'attribut "action" de <form>
        // Récupération du jeton de sécurité
        const nonce = $("#nonce").val();

        // Récupération de l'adresse de la page	pour pointer Ajax
        const ajaxurl = $("#ajaxurl").val();

        let pathname = window.location.pathname;
        let pathnamefinal = pathname.substring(
          0,
          pathname.lastIndexOf("/photo") + 1
        );
        let url =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "wp-admin/admin-ajax.php";

        console.log(
          "publications.js - url: " +
            url +
            " - ajaxurl: " +
            ajaxurl +
            " - nonce: " +
            nonce
        );

        if (document.getElementById("currentPage") !== null) {
          currentPage = document.getElementById("currentPage").value;
        }
        // Récupération des valeurs des variables du filtre au moment du click
        const categorie_id = document.getElementById("categorie_id").value;
        const format_id = document.getElementById("format_id").value;
        let order = document.getElementById("date").value;
        let orderby = "date";

        let max_pages = document.getElementById("max_pages").value;

        // currentPage + 1, pour pouvoir charger la page suivante
        currentPage++;
        document.getElementById("currentPage").value = currentPage;

        if (currentPage >= max_pages) {
          $("#load-more").addClass("hidden");
        } else {
          $("#load-more").removeClass("hidden");
        }

        $.ajax({
          type: "POST",
          url: url,
          dataType: "html", // <-- Change dataType from 'html' to 'json'
          data: {
            action: "nathalie_motta_load",
            nonce: nonce,
            paged: currentPage,
            categorie_id: categorie_id,
            format_id: format_id,
            orderby: orderby,
            order: order,
          },
          success: function (res) {
            $(".publication-list").append(res);

            // Mise à jour du n° de page affiché
            document.getElementById("currentPage").value = currentPage;
          },
        });
      });
    });
  })(jQuery);
});
