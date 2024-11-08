// Load recipes from localStorage or initialize with sample data
let recipes = JSON.parse(localStorage.getItem('recipes')) || [
    { name: 'Spaghetti Carbonara', ingredients: ['spaghetti', 'eggs', 'cheese', 'bacon'], instructions: 'Boil pasta, mix with eggs and cheese, add bacon.' },
    { name: 'Chicken Salad', ingredients: ['chicken', 'lettuce', 'tomatoes', 'cucumber'], instructions: 'Mix all ingredients together and serve.' },
  ];
  
  // Render recipes to the page
  function renderRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    
    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card';
      recipeCard.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      `;
  
      // Add event listener to open the recipe details in a new page
      recipeCard.addEventListener('click', () => openRecipeDetailPage(recipe));
      
      recipeList.appendChild(recipeCard);
    });
  }
  
  // Handle recipe upload
  document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const instructions = document.getElementById('instructions').value;
    
    const newRecipe = { name, ingredients, instructions };
    recipes.push(newRecipe);
  
    // Save the recipes to localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    renderRecipes();
    document.getElementById('recipeForm').reset();
  });
  
  // Ingredient search functionality
  document.getElementById('ingredientSearch').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => {
      return recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm));
    });
    
    // Display filtered recipes
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    
    filteredRecipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card';
      recipeCard.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      `;
      
      recipeCard.addEventListener('click', () => openRecipeDetailPage(recipe));
      
      recipeList.appendChild(recipeCard);
    });
  });
  
  // Open recipe details on a new page
  function openRecipeDetailPage(recipe) {
    // Save the recipe details to localStorage so that we can retrieve it on the new page
    localStorage.setItem('selectedRecipe', JSON.stringify(recipe));
  
    // Open a new page (for simplicity, we redirect to a new HTML page)
    window.location.href = 'recipe-detail.html';
  }
  
  // Render initial recipe list
  renderRecipes();
  