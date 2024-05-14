// adds event listener to all buttons with expected events 
document.addEventListener("DOMContentLoaded", function ()  {
     const speakButton = document.getElementById("speak-button");
     const input = document.getElementById("input-text");
     const characterCount = document.getElementById("character-count");
     const voiceSelectorButton = document.getElementById("voice-selector");
     const volumeControl = document.getElementById("volume-control");
     const readingSpeed = document.getElementById("reading-speed");
 
     // Define the character limit
     const characterLimit = 50000;

     // Initialize the voice manager and select a voice
     const voiceManager = speechSynthesis.getVoices();
     let selectedVoiceIndex = 1; // Default to the first available voice index
 
     // Function to update character count
     function updateCharacterCount() {
         const text = input.value;
         const count = text.length;
          
         // checks to see if the input surpasses the character limit of 500
         if (count <= characterLimit) { 
             // displays text to the character-count by referencing its ID 
             characterCount.textContent = `${count} / ${characterLimit}`; // $ denotes string interpolation with formatting, embeds variables or expressions inside a string 
         } else {
             // If the text exceeds the character limit then we only push the substring startting at 0 to the character limit to the output this way it does not update 
             input.value = text.substring(0, characterLimit);
             characterCount.textContent = `${characterLimit} / ${characterLimit}`; //characterlimit stays at 500 and cannot go over
         }
     }
 
     // Handle button click event for "Speak" button
     speakButton.addEventListener("click", function () {
         const textToSpeak = input.value; //initialize variable to store what needs to be read in 
 
          // there is no input, therefore we need to inform the user something is insufficient
         if (textToSpeak === "") {
             alert("No text was found to read."); //add alert 
         }
         
         // stores the active words to be spoken in a variable called utterance 
         const utterance = new SpeechSynthesisUtterance(textToSpeak);
         //choose the voice for the voice prompt 
         utterance.voice = voiceManager[selectedVoiceIndex];
 
         // Set the volume based on the slider value
         utterance.volume = parseFloat(volumeControl.value);

         // Set the speech tempo based on the slider value 
         utterance.rate = parseFloat(readingSpeed.value);

         // Stop any ongoing speech synthesis
         speechSynthesis.cancel();
 
         // Speak the text
         speechSynthesis.speak(utterance);
     });

     
 
     // Handle button click event for "Change Voice" button
     voiceSelectorButton.addEventListener("click", function () {
         selectedVoiceIndex = (selectedVoiceIndex + 1) % voiceManager.length;
         voiceSelectorButton.textContent = `Change Voice (${voiceManager[selectedVoiceIndex].name})`;
     });
 
     // Add input event listener to the textarea for live character count update
     input.addEventListener("input", updateCharacterCount);
 
     // Initial character count update
     updateCharacterCount();


    // Load the stored user input when the page loads
    window.addEventListener('load', function () {
        const storedUserInput = localStorage.getItem('textToSpeak');
        if (storedUserInput !== null) {
        document.getElementById('textInput').value = storedUserInput;
        }
    });
    
    // Save the user input when the "Save" button is clicked
    speakButton.addEventListener('click', function () {
        const userInput = document.getElementById('textInput').value;
    
        if (userInput.trim() !== '') {
        localStorage.setItem('textToSpeak', userInput);
        alert('Text saved to local storage!');
        } else {
        alert('Please enter some text before saving.');
        }
    });
  
     
 });
 
