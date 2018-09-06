let token,id;
let filter,userInput;
$(document).ready(() => {

	$('.userInput').focus();
	$('.movieContainerHeader').hide();
	$('.movieContainerCard').hide();
	$('#catagory').hide();
	$("#modalId").css("display","none");
	
	$('.btn').click(() => {
		 
		filter = $( "#filter option:selected").text();
		userInput= $('.userInput').val();
		//console.log(userInput+"    "+filter);
	 	
	 	if(userInput == ""){
	 		//alert("please enter the details");
	 		$("#modelMessage").text("Please enter movie,tv-show name/imdbID");
	 		$("#modalId").css("display","block");
	 		$("#close").click(() => {
    			$("#modalId").css("display","none");
			});
	 	}else{
	 		if(filter == "Title"){
	 			token="t="+userInput;
	 		}else if (filter == "Id"){
	 			token="i="+userInput;
	 		}
	 		getMovieObject();
	 	}	
		
	});

});
// API Call
//http://www.omdbapi.com/?token&apikey=[yourkey]&  &apikey=cf262e0a&

let getMovieObject = () => {

	$.ajax({
		crossOrigin: true,
		type:'GET',
		dataType:'json',
		async:true,
		url:'https://www.omdbapi.com/?'+token+'&apikey=cf262e0a&', 
		success:(response) => {
			console.log(response)
			console.log(response.Response);

			if(response.Response === "False"){
				if(response.Error === "Movie not found!"){
					$("#modelMessage").text("no record found with the title provided.");

					$("#modalId").css("display","block");
			 		$("#close").click(() => {
		    			$("#modalId").css("display","none");
					});
					$('.userInput').val("");

				}else if(response.Error === "Incorrect IMDb ID."){
					
					$("#modelMessage").text("no record found with the IMDBID provided.");

					$("#modalId").css("display","block");
			 		$("#close").click(() => {
		    			$("#modalId").css("display","none");
					});
					$('.userInput').val("");
				}
			}else{

				$("#modelMessage").text(response.Title);
				$("#modalId").css("display","block");
				$("#close").click(() => {
		    			$("#modalId").css("display","none");
				});

				$('#catagory').show().html("Catagory : "+response.Type);
				$('.movieContainerHeader').show();
				$('#moviename').text(response.Title);
				$('#movieyear').text("("+response.Year+")");
				$('#rating').text("Rating: "+response.imdbRating+"/10");

				$('.movieContainerCard').show();
					
					if(response.Poster === "N/A"){
						$('.card-img-top').attr("src","assets/images/Poster.jpg");
					}else{
						$('.card-img-top').attr("src",response.Poster);
					}

				$('.card-title').text(response.Title);
				$('#year').text(`Year : ${response.Year}`);
				$('#rated').text(`Rated : ${response.Rated}`);
				$('#released').text(`Released : ${response.Released}`);
				$('#genre').text(`Genre : ${response.Genre}`);
				$('#director').text(`Director : ${response.Director}`);	

				let desc =  
					`<div id="fullDesc">
						<h4 id="fullDesc">See Full Cast and crew </h4>
						<p id="fullDesc"><strong>Directed By : </strong>${response.Director}</p>
						<p id="fullDesc"><strong>Actors : </strong>${response.Actors}</p>
						<p id="fullDesc"><strong>Awards : </strong>${response.Awards}</p>
						<p id="fullDesc"><strong>Country : </strong>${response.Country}</p>
						<p id="fullDesc"><strong>Language : </strong>${response.Language}</p>
						<p id="fullDesc"><strong>Runtime : </strong>${response.Runtime}</p>
						<p id="fullDesc"><strong>Writer : </strong>${response.Writer}</p>
						<p id="fullDesc"><strong>IMDbID : </strong>${response.imdbID}</p>
						<p id="fullDesc"><strong>IMDbRating : </strong>${response.imdbRating}</p>
						<p id="fullDesc"><strong>IMDbVotes : </strong>${response.imdbVotes}</p>

					</div>`;
				$('.description').html(desc);

			}
			$('.userInput').val("");
		},
		error: (err) => {
			console.log(err.responseJSON.error.message);
		}

	}); //Ajax call Ended


} //function end