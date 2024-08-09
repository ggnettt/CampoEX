$('.btn').on('click', function(){
    var cat = $(this).attr('data-cad')
    if(cat == 'todos'){
        $('.cursos div').show()
    }else{
        $('.cursos div').each(function(){
            if(!$(this).hasClass(cat)){
                $(this).hide()
            }else{
                $(this).show()
            }
        })
    }
})