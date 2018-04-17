$(document).ready(function() {
    $('.ajaxForm').submit(function(event) {

        var form = $(this);

        var data = form.serialize();
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: data,
            success: function(data) {

                $.fancybox({ href: "#thanks" });


            }
        })

        form.trigger('reset');
        event.preventDefault();
    });
    $('.header-navigation-device-icon').click(function() {
        $('.mbox').toggle()
    });

    $('.header-navigation-wrap-top-right').click(function() {
        $('.mbox').toggle()
    });
})