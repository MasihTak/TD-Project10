/* jshint esversion: 6 */

$(document).ready(function() {
  let employees = [];

  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us&format=PrettyJSON',
    dataType: 'json',
    success: function(data) {
      let profileHTML = '';
      employees = data.results;
      $.each(employees, function (index, user){
        profileHTML += `<div class="profile card">
                          <img class="round" src="${user.picture.medium}">
                          <div class="info i-b">
                            <h3 class="cap">${user.name.first} ${user.name.last}</h3>
                            <p class="email font-light">${user.email} </p>
                            <p class="font-light cap">${user.location.state}</p>
                          </div>
                        </div>`;
        });
        $('#employees').html(profileHTML);

      const profiles = $('#employees .profile');
        for (let i = 0; i < profiles.length; i++) {
        profiles[i].onclick = function () {
          $('#modal-window').show();
          buildModal(employees[i], i);
        };
      }

      // search users
      let users = $('#employees .profile h3');
      $(".search-box").keyup(function() {
        const $input = $(this).val().toLowerCase();
        $.each(users, function(index, user) {
          if (user.innerHTML.toLowerCase().includes($input)) {
            $(this).closest('.profile').show();
          } else {
            $(this).closest('.profile').hide();
          }
        });
      });

      function buildModal(target, index) {
        let birthday = new Date(Date.parse(target.dob.replace(/-/g, "/"))).toLocaleDateString(navigator.language);
        let fullName = `${target.name.first} ${target.name.last}`;
        const  modalHTML = `<div class="modal__wrap">
                             <button id="prev">&LessLess;</button>
                             <button id="next">&GreaterGreater;</button>
                             <button id="close">&#10006;</button>
                             <img class="round" src="${target.picture.large}" alt="${fullName}">
                             <h3 class="cap">${fullName}</h3>
                             <p class="email font-light">${target.email} </p>
                             <p class="font-light cap">${target.location.state}</p>
                             <hr />
                             <p class="font-light">${target.cell}</p>
                             <p>${target.location.street} ${target.location.city}, ${target.location.state} ${target.location.postcode}, ${target.nat}</p>
                             <p class="font-light">Birthday: ${birthday}</p>
                           </div>`;
              $('#modal-window').html(modalHTML);


              $("#next").click(function() {
                  buildModal(employees[index + 1], index + 1);
              });

              $("#prev").click(function() {
                   buildModal(employees[index - 1], index - 1);
              });

              $('#close').click(function() {
                $('#modal-window').hide();
              });

              if (index >= 1 && index <= employees.length) {
                $("#prev").remove('disabled');
              } else {
                $("#prev").addClass('disabled');
              }

              if (index + 1 === employees.length) {
                $("#next").addClass('disabled');
              } else {
                $("#next").remove('disabled');
              }
        }
    } // success
  }); // end ajax


}); // end ready
