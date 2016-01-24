(function () {
    var game_data = {};
    game_data.path = '';
    var selector;
    var now_candy = 1;
    var sort_method = 1;
    var candidate_vote_nums = [];



    $(function () {




        init();



    });




    function checkForm() {
        var error = '';
        var senddata_obj = {};


        if (!validateForm('#f-firstname')) {
            error += "Need Firstname\n";
        }


        if (!validateForm('#f-lastname')) {
            error += "Need Lastname\n";
        }

        //        if (!validateForm('#f-company')) {
        //            error += "尚未輸入手機\n";
        //        }

        if (!validateForm('#f-email')) {
            error += "Need Email\n";
        }

        if (!validateEmail($('#f-email').val())) {
            error += "EMAIL format error\n";
        }



        senddata_obj.user_firstname = $('#f-firstname').val();
        senddata_obj.user_lastname = $('#f-lastname').val();
        senddata_obj.user_company = $('#f-company').val();
        senddata_obj.user_email = $('#f-email').val();
        senddata_obj.user_comments = $('#f-comments').val();

        if (error != "") {
            alert(error);
            $('.container-form .error').html(error.replace(/\n/g, '<br>'));
        } else {
            sendData(senddata_obj);
        }
    }

    function sendData(_formdata) {

        $.post("http://dynafeed-test.azurewebsites.net/api/save_user.php", _formdata, function (data) {
            if (data.success) {
                alert('save ok');
            } else {
                if (data.error_code == '401') {
                    alert(data.msg);
                } else {
                    alert(data.msg);
                }
                //location.href = './';
            }
        }, "json");


    }



    function init() {
        $('#f-submit').click(function (e) {
            $('#test-debug').html('start saving....');
            checkForm();
        });
    }




})();