
function myFunction() {
  var input, filter, table, tr, td, i, txtValue1, txtValue2;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
      // Obtém a primeira célula (coluna) da linha
      th1 = tr[i].getElementsByTagName("th")[0];
      // Obtém a segunda célula (coluna) da linha
      th2 = tr[i].getElementsByTagName("th")[1];

      if (th1 || th2) {
          // Pega o texto das duas colunas
          txtValue1 = th1 ? th1.textContent || th1.innerText : "";
          txtValue2 = th2 ? th2.textContent || th2.innerText : "";

          // Verifica se a string de filtro está presente em qualquer uma das colunas
          if (txtValue1.toUpperCase().indexOf(filter) > -1 || 
              txtValue2.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }       
  }
}





