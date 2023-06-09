// Script pour gérer les filtres d'affichage en page d'accueil (front-page)
//
// console.log("Script filtres en ajax lancé !!!");

document.addEventListener("DOMContentLoaded", function () {
  const message = "<p>Désolé. Aucun article ne correspond à cette demande.<p>";

  // Initialisation des variables des filtres
  let categorie_id = "";
  if (document.getElementById("categorie_id")) {
    document.getElementById("categorie_id").value = "";
  }
  let format_id = "";
  if (document.getElementById("format_id")) {
    document.getElementById("format_id").value = "";
  }
  let order = "";
  if (document.getElementById("date")) {
    document.getElementById("date").value = "";
  }

  let currentPage = 1;
  let max_pages = 1;

  document.getElementById("currentPage").value = 1;

  // Gestion du déplacement des filtres horizontalement
  const swiper = new Swiper(".swiper-container", {
    freeMode: true,
    grabCursor: true,
    breakpoints: {
      1200: {
        grabCursor: false,
        allowTouchMove: false,
      },
    },
  });

  (function ($) {
    $(document).ready(function () {
      $(".option-filter").change(function (e) {
        // Empêcher l'envoi classique du formulaire
        e.preventDefault();

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
          "/wp-admin/admin-ajax.php";

        console.log(
          "Filtres.js - url: " +
            url +
            " - ajaxurl: " +
            ajaxurl +
            " - nonce: " +
            nonce
        );

        if (document.getElementById("max_pages") !== null) {
          max_pages = document.getElementById("max_pages").value;
        }

        // Récupération des valeurs sélectionnées
        let targetName = e.target.name;
        let targetValue = e.target.value;

        // Réaffectation de la valeur dans la variable correspondante
        if (targetName === "categorie_id") {
          categorie_id = targetValue;
        }
        if (targetName === "format_id") {
          format_id = targetValue;
        }
        if (targetName === "date") {
          order = targetValue;
        }

        let orderby = "date";

        // Génération du nouvel affichage
        $.ajax({
          type: "POST",
          url: url,
          dataType: "html", // <-- Change dataType from 'html' to 'json'
          data: {
            action: "nathalie_motta_load",
            nonce: nonce,
            paged: 1,
            categorie_id: categorie_id,
            format_id: format_id,
            orderby: orderby,
            order: order,
          },
          success: function (res) {
            $(".publication-list").empty().append(res);
            // Récupération de la valeur du nouveau nombre de pages
            let max_pages = document.getElementById("max_pages").value;
            let nb_total_posts = 0;

            // Affiche ou cache le bouton "Charger plus" en fonction du nombre de pages
            if (currentPage >= max_pages) {
              $("#load-more").addClass("hidden");
            } else {
              $("#load-more").removeClass("hidden");
            }

            // Contrôle s'il y a des photos à afficher
            if (document.getElementById("nb_total_posts") !== null) {
              nb_total_posts = document.getElementById("nb_total_posts").value;
            }

            // Et affiche un message s'il n'y a aucune photo à afficher
            if (nb_total_posts == 0) {
              $(".publication-list").append(message);
            }

            // Réinitialisation du n° de page affiché
            document.getElementById("currentPage").value = 1;
          },
        });
      });
    });
  })(jQuery);
});
