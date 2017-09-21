$(document).ready(() => {
    // name = "{{ term }}";
    let accumulatedResult = 0;
    $('#submit-word-answer').click((eve) => {
        eve.preventDefault();
        let form = document.querySelector('#wordPuzzle');
        let formActionUrl = form.action;
        // let formData = new FormData(form);
        let formData = {
            answer: answer.value
        }
        form.reset();
        $.ajax({
                url: formActionUrl,
                method: 'POST',
                data: formData
            })
            .done((res) => {
                if (res.played == 73)
                    alert('you have attempted all the terms');
                else {
                    if (res.verdict === "W")
                        ++accumulatedResult;
                    else {
                        if (accumulatedResult > 0)
                            --accumulatedResult;
                        else
                            accumulatedResult = 0;
                    }
                    $('#given-letters-list').empty();
                    console.log(res.term);

                    $('#definition-section-container>p>i').text(res.definition);
                    for (let i = 0; i < res.shuffledTerm.length; i++) {
                        $("<li>" + res.shuffledTerm[i] + "</li>").appendTo('#given-letters-list');
                    }
                    if (!($('#gameVerdict').length)) {
                        $('<p id = "gameVerdict">' + accumulatedResult + ' / <span>&nbsp;&nbsp;74</span></p>').appendTo('#resultContainer');
                    } else {
                        $('#gameVerdict').html(accumulatedResult + " / <span>&nbsp;&nbsp;74</span>");
                    }
                    if (res.verdict === "W") {
                        $('#correctTerm').remove();
                    } else if (!($('#correctTerm').length) && res.verdict === "L") {
                        $('<p id="correctTerm">The answer was <span>' + res.previousTerm + '</span></p>').appendTo('#correctAnswer');
                    } else {
                        $('#correctTerm').html("The answer was <span>" + res.previousTerm + "</span>");
                    }
                    setTimeout(() => {
                        $('#correctTerm').fadeOut("slow", "linear").remove();
                    }, 10000);
                }


            })

    });
    $('#tryAnotherOne').click((eve) => {
        eve.preventDefault();

        $.ajax({
                url: "/tryAnotherOne",
                method: 'GET'
            })
            .done((res) => {
                if (res.played == 73)
                    alert('you have attempted all the terms');
                else {
                    $('#given-letters-list').empty();
                    $('#definition-section-container>p>i').text(res.definition);
                    for (let i = 0; i < res.shuffledTerm.length; i++) {
                        $("<li>" + res.shuffledTerm[i] + "</li>").appendTo('#given-letters-list');
                    }
                }

            })

    })

});