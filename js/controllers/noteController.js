(function(){
	var controllers = angular.module('controllers');

/**
  * This controller is responsible for handling everything note-related in the view.
  * It gathers information from the noteHttpService and updates the view accordingly.
  */
 controllers.controller('noteController', ['$scope', 'noteHttp', '$location', function ($scope, noteHttp, $location){

 
 	$scope.noCurrentNote = true; //Makes the delete-button clickable/unclickable.


 	/**
 	 * Gets a specific users notes and updates an array.
 	 */
 	$scope.getNotes = function(){
 		$scope.isLoading = true
 		noteHttp.getNotes().then(function(response){
 			$scope.notes = response;
 			$scope.isLoading = false;
 		}, function(error){
 			sessionStorage.clear();
 			$location.path('/');
 		})
 	}
 	$scope.getNotes(); 

   /**
 	* This function is invoked in other functions when a promise is rejected.
 	* Right now it only deals with error-code 498 but it's easily expandable.
 	* @param {error} A rejected promise-object containing information of what went wrong.
 	*/
 	dealWithErrors = function(error){
 		if(error.status == 498){
 			sessionStorage.clear();
 			$location.path('/');
 		}
 	}

 	/**
 	 * Saves a specific note.
 	 */
	$scope.storeNote = function(){
		$scope.isLoading = true;
		if($scope.currentNote == "" || $scope.currentNote == undefined){
			console.log($scope.currentNote);
			createNewNote();
		}else{
			updateNote();
		}
	}

	/**
	 * Removes a specific note using it's ID.
	 */
	$scope.removeNote = function(){
		$scope.isLoading = true;
		noteHttp.removeNote($scope.currentNote).then(function(response){
			$scope.notes.forEach(function(value, index, arr){
				if(value.id == response.data.id){
					$scope.notes.splice(index, 1);
					$scope.clearFields();
				}
			})
		}, function(error){
			dealWithErrors(error);
		});
		
	}

	/**
	 * Gets a specific note and updates the view with the notes content (title, text, color).
	 * @param {String} id The ID for a specific note.
	 */
	$scope.updateFields = function(id){
		$scope.isLoading = true;
		noteHttp.getNote(id).then(function(response){
			$scope.currentNote = id;
			$scope.noteTitle = response.data.title;
			$scope.noteText = response.data.text;
			$scope.noteColor = response.data.color;
			$scope.noCurrentNote = false;
			$scope.isLoading = false;
		})

	}

	/**
	* Starts the method chain for creating a new note.
	*/
	createNewNote = function(){
		noteHttp.saveNote($scope.noteTitle, $scope.noteText, $scope.noteColor)
			.then(function(response){
				$scope.notes.push(response.data);
				$scope.clearFields();
			}, function(error){
				dealWithErrors(error);
			});
	}

	/**
	 * Modifies a specific note using it's ID. It updates the storage for both client and backend.
	 * @param {String} id The ID for a specific note.
	 */
	updateNote = function(){
		$scope.isLoading = true;
		noteHttp.updateNote($scope.currentNote, $scope.noteTitle, $scope.noteText, $scope.noteColor)
		.then(function(response){
			$scope.notes.forEach(function(value, index, arr){
    			if(value.id == $scope.currentNote){
    				$scope.notes[index].color = $scope.noteColor;
    				$scope.notes[index].title = $scope.noteTitle;
    			}	
			});
			$scope.clearFields();

		}, function(error){
			dealWithErrors(error);
		})
	}


	/**
	 * Clears the textfield and area viewing the notes content 
	 * and changes the value of two booleans.
	 */
	$scope.clearFields = function(){
		$scope.noteTitle = "";
		$scope.noteText = "";
		$scope.isLoading = false;
		$scope.currentNote = "";
		$scope.noCurrentNote = true;
	}

}]);

}());