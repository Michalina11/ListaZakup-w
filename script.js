$(document).ready(function () {

    // Drag & Drop
    $("#shoppingList").sortable();

    function addItem(position = "append") {
        let value = $("#productInput").val();
        if (value.trim() === "") return;

        let li = $("<li>")
            .addClass("list-group-item")
            .text(value);

        if (position === "prepend") {
            $("#shoppingList").prepend(li);
        } else {
            $("#shoppingList").append(li);
        }

        $("#productInput").val("");
    }

    $("#addBtn").click(function () {
        addItem("append");
    });

    $("#addStartBtn").click(function () {
        addItem("prepend");
    });

    $("#addEndBtn").click(function () {
        addItem("append");
    });

    $("#removeLastBtn").click(function () {
        $("#shoppingList li").last().remove();
    });

    $("#clearBtn").click(function () {
        $("#shoppingList").empty();
    });

    $("#restoreBtn").click(function () {
        $("#shoppingList").html(`
            <li class="list-group-item">Jajka</li>
            <li class="list-group-item">Ser</li>
            <li class="list-group-item">Sok</li>
        `);
    });

    $("#colorEvenBtn").click(function () {
        $("#shoppingList li:even").css("background-color", "#d1ecf1");
    });

    $("#sortBtn").click(function () {
        let items = $("#shoppingList li").get();

        items.sort(function (a, b) {
            return $(a).text().localeCompare($(b).text());
        });

        $("#shoppingList").empty().append(items);
    });

    $("#filterInput").on("keyup", function () {
        let value = $(this).val().toLowerCase();

        $("#shoppingList li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // Kliknięcie w element → edycja
    $("#shoppingList").on("click", "li", function () {

        let li = $(this);
        let text = li.text();

        li.fadeOut(200, function () {
            let input = $("<input>")
                .addClass("form-control")
                .val(text);

            li.html(input).fadeIn(200);

            input.focus();

            input.keypress(function (e) {
                if (e.which === 13) {
                    let newText = $(this).val();
                    li.fadeOut(200, function () {
                        li.text(newText)
                          .addClass("list-group-item active")
                          .fadeIn(200);
                    });
                }
            });
        });

    });

});