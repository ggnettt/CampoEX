
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  
  let slideIndex = 1;
  showSlides(slideIndex);
  
  //contola o proximo / 
  function plusSlides(n){
      showSlides(slideIndex +=n);
  }
  
  
  function currentSlide(n){
      showSlides(slideIndex = n);
      }
      
      
  function showSlides(n){
      let i;
      let slides = document.getElementsByClassName("slide");
      let dots = document.getElementsByClassName("dot");
  if (n > slides.length){slideIndex = 1}
  if (n < 1){slideIndex = slides.length}
  for (i = 0; i < slides.length; i++){
      slides[i].style.display = "none";
  }
  for (i=0; i < dots.length; i++){
      dots[i].className = dots[i].className.replace("active","");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += "active";
  }
  
  
  
  
  
  
  
  



  
















