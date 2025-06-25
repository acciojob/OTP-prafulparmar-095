document.addEventListener('DOMContentLoaded', () => {
    const codes = document.querySelectorAll('.code'); // Get all input fields

    // Focus the first input field on page load
    if (codes.length > 0) {
        codes[0].focus();
    }

    // Add event listeners for each code input field
    codes.forEach((code, idx) => {
        // --- Forward Typing Logic ---
        code.addEventListener('input', (e) => {
            // Ensure only one digit is entered
            if (code.value.length > 1) {
                code.value = code.value.slice(0, 1); // Truncate to one character
            }

            // If a digit is entered and it's not the last field, move focus to the next field
            if (e.target.value !== '' && idx < codes.length - 1) {
                codes[idx + 1].focus();
            }
        });

        // --- Backspace Logic ---
        code.addEventListener('keydown', (e) => {
            // If Backspace key is pressed
            if (e.key === 'Backspace') {
                // If the current field is NOT empty, clear its content.
                // The focus will stay on the current field for a moment,
                // but the prompt implies we should clear *and* move back.
                // Let's make it more robust: if it has content, clear it.
                // If it's empty, *then* move to previous and clear it.
                
                if (e.target.value === '' && idx > 0) {
                    // Prevent default backspace behavior (which might affect browser history)
                    e.preventDefault(); 
                    // Move focus to the previous field
                    codes[idx - 1].focus();
                    // Clear the content of the previous field
                    codes[idx - 1].value = ''; 
                } else if (e.target.value !== '') {
                    // If current field has a value, just clear it.
                    // If the user continues pressing backspace, the above condition will then trigger.
                    e.target.value = '';
                }
            }
        });

        // --- Select all text on focus ---
        // This makes it easier for users to type over an existing digit
        code.addEventListener('focus', (e) => {
            e.target.select();
        });
    });
});