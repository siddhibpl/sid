function create_DatatableAboutMe(name) {
    return $(name).DataTable({
            "paging": false,
            "lengthChange": true,
            "searching": false,
            "ordering": false,
            "info": false,
             "scrollX":true,
             scrollCollapse: true,
            "autoWidth": true
     });
}
