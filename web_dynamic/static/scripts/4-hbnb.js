$(document).ready(function () {
    // to store amenities with their status (checked or unchecked)
    const amenities = {};
    // listen for changes on all checkboxes
    $("li input[type=checkbox]").change(function () {
		if (this.checked) {
            // if checked store in dict
			amenities[amenity_id] = true;
		} else {
			delete amenities[this.dataset.name];
		}
        // empty string to store the list of checked amenities
		let amenitiesList = '';
        // looping through the 'amenities' to create a comma-separated list of selected amenities
        for (const id in amenities) {
            // if 'amenitiesList' is empty, add the amenity_id without a comma, otherwise, add a comma before the next amenity_id
            if (amenitiesList === '') amenitiesList += id;
            else amenitiesList += ', ' + id;
        }
        // update the text inside the <h4> tag within the 'div.amenities' with the updated list of selected amenities
        $('div.amenities h4').text(amenitiesList);
	});

    // url + a function to be excuted when the request is compiete
    // data = data returned = json obj
    // textStatus = status of request
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
        if (textStatus === 'success' && data === 'OK') {
        $('#api_status').addClass('available');
        } else {
        $('#api_status').removeClass('available');
        }
    });

    $.post({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data, textStatus) {
          for (const place of data) {
            // Create an article tag as a variable
            const article = $('<article>');
            // Create each component of the article tag as variable, and append later to the article
    
            const titleBox = $('<div>').addClass('title_box');
            $('<h2>').text(place.name).appendTo(titleBox);
            $('<div>').addClass('price_by_night').text('$' + place.price_by_night).appendTo(titleBox);
    
            const infoBox = $('<div>').addClass('information');
            const pluralGuest = place.max_guest > 1 ? ' Guests' : ' Guest';
            $('<div>').addClass('max_guest').text(place.max_guest + pluralGuest).appendTo(infoBox);
            const pluralRooms = place.number_rooms > 1 ? ' Bedrooms' : ' Bedroom';
            $('<div>').addClass('number_rooms').text(place.number_rooms + pluralRooms).appendTo(infoBox);
            const pluralBaths = place.number_bathrooms > 1 ? ' Bathrooms' : ' Bathroom';
            $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + pluralBaths).appendTo(infoBox);
    
            const description = $('<div>').addClass('description').html(place.description);
            // Append all elements to article
            article.append(titleBox, infoBox, description); // Add user if uncommented up. For now, as said in the task, we don't include the owner
            // Append article to places
            $('.places').append(article);
          }
        }
    });
    });
