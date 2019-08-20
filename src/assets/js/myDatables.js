/*
$(document).ready(function() {
  $('#productsTable').DataTable({
    aLengthMenu: [[5, 5, 25, -1], [5, 5, 25, 'All']],
    iDisplayLength: 25
  });
});
*/
/*
window.setTimeout(function() {
  $(document).ready(function() {
    $('#productsTable').DataTable();
  });
}, 4500);
*/

window.setInterval(function() {
  $(document).ready(function() {
    $('#productsTable').DataTable();
  });
}, 3500);
