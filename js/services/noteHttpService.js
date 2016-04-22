
(function(){
  "use strict";

/**
 * This service is for communication between the client and the server.
 * It handles all note-related HTTP-requests.
 */
angular.module('services', [])

.factory('noteHttp', ['$http', '$q', function ($http, $q){
	


	var API_ADRESSES = {
		NORMAL: "http://localhost:4500",
		JSONP: "http://localhost:4500?callback=JSON_CALLBACK"
	};



	/**
	 * Retrieves all of the users existing notes.
	 * @return [] with notes.
	 */
	function getNotes(){
		$http.defaults.headers.get = { 'authentication-token' : sessionStorage.userToken};
		return $http.get(API_ADRESSES.NORMAL + "/api/notes")
		.then(function(response){
			var noteIds = response.data;
			return noteIds;		
		}, function(error){
			return $q.reject(error);

		});
	}


	/**
	 * Saves a specific note - backend.
	 * @param  {String} noteTitle Notes title.
	 * @param  {String} noteText  Notes content.
	 * @param  {String} noteColor Notes color.
	 * @return {Object}	The saved object or a rejected promise in case something went wrong.
	 */
	function saveNote(noteTitle, noteText, noteColor){
		var info = {
			method: 'post',
			data: {"noteData":{"title":noteTitle,"text": noteText, "color": noteColor}},
			url: API_ADRESSES.NORMAL + "/api/notes",
			headers: {
				'authentication-token': sessionStorage.userToken
			},
   		};
		return $http(info).then(function(response){
			return response;

		}, function(error){
			return $q.reject(error);
		});
	}


	/**
	 * Retrieves a specific note.
	 * @param  {String} noteId The ID for a specific note.
	 * @return {Object} The requested object or a rejected promise.
	 */
	function getNote(noteId){
		var info = {
			method: 'get',
			url: API_ADRESSES.NORMAL + "/api/notes/" + noteId,
			headers: {
				'authentication-token': sessionStorage.userToken
			},
   		};
   		return $http(info).then(function(response){
			return response;
			
		}, function(error){
			return $q.reject(error);
		});
	}


	/**
	 * Updates an already existing note. 
	 * @param  {String} noteId    The ID for a specific note.
	 * @param  {String} noteTitle Notes title.
	 * @param  {String} noteText  Notes content.
	 * @param  {String} noteColor Notes color.
	 * @return {Object} The updated object or a rejected promise.
	 */
	function updateNote(noteId, noteTitle, noteText, noteColor){
		var info = {
			method: 'put',
			data:{"noteData":{"title":noteTitle,"text": noteText, "color": noteColor}},
			url: API_ADRESSES.NORMAL + "/api/notes/" + noteId,
			headers: {
				'authentication-token': sessionStorage.userToken
			},
   		};
   		return $http(info).then(function(response){
			return response;
			
		}, function(error){
			return $q.reject(error);
		});
	}


   /**
	* Removes a specific note.
	* @param {String} noteId The ID for a specific note.
	* @return {Object} The removed note or a rejected promise.	
	*/
	function removeNote(noteId){
		var info = {
			method: 'delete',
			url: API_ADRESSES.NORMAL + "/api/notes/" + noteId,
			headers: {
				'authentication-token': sessionStorage.userToken
			},
   		};
   		return $http(info).then(function(response){
			return response;
			
		}, function(error){
			return $q.reject(error);
		});
	}

    
    return {
		saveNote: saveNote,
		getNotes: getNotes,
		getNote: getNote,
		removeNote: removeNote,
		updateNote: updateNote
	};
}])


}());