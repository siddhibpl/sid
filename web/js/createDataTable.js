function create_DatatableAboutMe(name) {
  return $(name).DataTable({
    "paging": false,
    "lengthChange": true,
    "searching": false,
    "ordering": false,
    "info": false,
    "scrollX": true,
    scrollCollapse: true,
    "autoWidth": true
  });
}

function create_DatatableTOtalCompany(name) {
  return $(name).DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "info": false,
    "scrollX": true,
    scrollCollapse: true,
    "autoWidth": true
  });
}

function create_DatatableTOtalCollege(name) {
  return $(name).DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "scrollX": true,
    scrollCollapse: true,
    "autoWidth": true
  });
}

function create_DatatableTOtalStudent(name) {
  return $(name).DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "scrollX": true,
    scrollCollapse: true,
    "autoWidth": true
  });
}

function create_DatatableTOtalStudentTradeWiseValidationAndPrintPdf(name) {
  return $(name).DataTable({
    dom: 'Bfrtip',
    buttons: [{
        extend: 'print',
        text: 'Print all'
      },
      {
        extend: 'print',
        text: 'Print selected',
        exportOptions: {
          columns: ':visible:not(.not-exported)',
          modifier: {
            selected: true
          }
        }
      },
      {
        extend: 'pdf',
        text: 'Save As PDF',
        exportOptions: {
          columns: ':visible:not(.not-exported)',
          modifier: {
            selected: true
          }
        }
      }
    ],
    select: {
      style: 'multi'
    },
  });
  $('.dt-button').addClass('btn btn-primary');
}
