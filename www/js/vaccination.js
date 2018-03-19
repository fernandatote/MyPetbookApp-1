// VACCINATION PAGE JS
//---------------------------------------------------------------------- 

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeVaccination = false;

function onDeviceReady() {

  if (initializeVaccination) {
    return 
  } else {
    initializeVaccination = true;
  }

  // Save Vaccine Data Button from New Vaccine Screen

  $('#save-vaccine-btn').click(function(){
    var saveVaccineData = {
      name: $('#new-vaccine-name').val(),
      date: $('#new-vaccine-date').val(),
      expiration: $('#new-vaccine-expiration').val()
    }

  // code to create a user id on database
    // var newUserKey = firebase.database().ref().child('users').push().key;


    // code to create a pet id on database
    // var petKey = firebase.database().ref().child('users/pet').push().key;

    // code to create a vaccine id on database
    var vaccineId = firebase.database().ref().child('users/pet/vaccination').push().key;

    // const petData = {
    //     name: "Tutous",
    //     // vaccination: saveVaccineData
    //   }

    // path to set the data on Firebase
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/vaccination/" + vaccineId).set(saveVaccineData);

    // return to main vaccination page
    window.location.replace("./vaccination.html");
  });

  const users = firebase.database().ref('/users');

  // using the keys previously created to assign vaccination
  const userKey = "-L7qtGJv81gwWN-2R1NS";
  const petKey = "-L7qujE6zObeeliWQj5p";

  // FUNCTION CHILD ADDED - Add vaccine related to a pet into Firebase

  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/vaccination/").on('child_added', function(data){
    
    const vaccineId = data.key;
    const saveVaccineDataObj = data.val();

    $('#load-card').prepend(`<div id="${vaccineId}"><div id="card" class="box-shadow-all-light">
      <section id="vaccine-card" >
        <section>
          <span id="menu-elipse"><a href="#">...</a></span>
          <!-- options elipse nav -->
          <nav id="elipse-options-nav" class="box-shadow-bottom-dark display-none">
            <ul>
              <li><a href="#" id="edit-vaccine">Edit</a></li>
              <li><a href="#" id="vaccine-calendar">Add Alert</a></li>
              <br>
              <br>
              <li><a href="#" id="delete-vaccine" class="delete-option">Delete</a></li>
            </ul>
          </nav>
        </section>

        <section>
          <h4 id="vaccine-name" class=" field-info field-name">${saveVaccineDataObj.name}</h4>
          <h4 class="field-info">Date Taken</h4>
          <p id="vaccine-date">${saveVaccineDataObj.date}</p>
          <h4 class="field-info">Expiration Date</h4>
          <p id="vaccine-expiration">${saveVaccineDataObj.expiration}</p>
        </section>
      </section>
    </div></div>`)

    // Edit a specific Vaccine Data Stored 

    $(`#${vaccineId} #edit-vaccine`).click(function(){
      $("#edit-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#edit-vaccine-id').val(vaccineId);
      $('#edit-vaccine-name').val(saveVaccineDataObj.name);
      $('#edit-vaccine-date').val(saveVaccineDataObj.date);  
      $('#edit-vaccine-expiration').val(saveVaccineDataObj.expiration);
    });

    // Display the menu elipse for each card/vaccineId

    $(`#${vaccineId} #menu-elipse`).click(function() {
      $(`#${vaccineId} #elipse-options-nav`).slideToggle("slow");
    });

    // Delete a specific vaccination entry

    $(`#${vaccineId} #delete-vaccine`).click(function(event){
      firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/vaccination/" + vaccineId).remove();
    });

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/vaccination/" + vaccineId).on('child_removed', function(data){
      $(`#${vaccineId}`).remove();
    });

    // firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/vaccination/" + vaccineId).on('child_changed', function(data) {});

  }); //End of function "on child_added"


  // Edit Vaccine Button Submition Action from Edit Vaccine Screen
  $('#edit-vaccine-btn').click(function(){
    var editVaccineData = {
      name: $('#edit-vaccine-name').val(),
      date: $('#edit-vaccine-date').val(),
      expiration: $('#edit-vaccine-expiration').val()
    }
    var vaccineId = $('#edit-vaccine-id').val();

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/vaccination/" + vaccineId).set(editVaccineData);
    
    window.location.replace("./vaccination.html");
  });

  // Delete Vaccine Data Stored

  $("#delete-vaccine").click(function(){
    $("#delete-card").removeClass("display-none");
    $("#load-card").addClass("display-none");
    var deleteVaccineData = getData();
    $('#delete-vaccine-name').val(deleteVaccineData.name);
    $('#delete-vaccine-date').val(deleteVaccineData.date);  
    $('#delete-vaccine-expiration').val(deleteVaccineData.expiration);

  });


  // Add Vaccine from Add Button on Bottom Screen

  $('#imgPop').click(function(){
    $(".cards").addClass("display-none");
    $('#new-card').removeClass("display-none");

  });

  // Display Edit Card after Choosing Edit Vaccine Entry from Elipse Menu

  $('#edit-vaccine').click(function(){
    $(".cards").addClass("display-none");
    $('#edit-card').removeClass("display-none");

  });

  // Display Delete Vaccine Card after Choosing Entry from Elipse Menu

  $('#delete-vaccine').click(function(){
    $(".cards").addClass("display-none");
    $('#delete-card').removeClass("display-none");
  });


  // POPUPS FOR SAVE BUTTON ON NEW, EDIT AND DELETE VACCINATION SCREEN

  // Save Info popup

  $('#save-info').click(function(){
  $('#addVaccine').removeClass("display-none");
  }); 

  $("#addVaccine").click(function(){
    $("#addVaccine").addClass("display-none");
  });

  // Edit Info Popup
  $('#edit-info').click(function(){
  $('#editVaccine').removeClass("display-none");
  }); 

  $("#editVaccine").click(function(){
    $("#editVaccine").addClass("display-none");
  });


   // Delete Info Popup
  $('#delete-info').click(function(){
  $('#deleteVaccine').removeClass("display-none");
  }); 

  $("#deleteVaccine").click(function(){
    $("#deleteVaccine").addClass("display-none");
  });


};