const foods = require("../data/foods");

function calculateProteinTarget(weight, goal) {
  if (goal === "fat_loss") return weight * 1.2;
  if (goal === "muscle_gain") return weight * 1.5;
  return weight * 1.0;
}

function optimizeMeals(weight, goal, budget, preference) {
  const targetProtein = calculateProteinTarget(weight, goal);

  // 1. Filter foods by preference
  const filteredFoods = foods.filter((food) => {
    if (preference === "veg") return food.type === "veg";
    if (preference === "non-veg") return food.type === "non-veg";
    if (preference === "veg_egg")
      return food.type === "veg" || food.type === "veg_egg";
    return true;
  });

  // 2. Add protein per rupee
  const enrichedFoods = filteredFoods.map((food) => ({
    ...food,
    efficiency: food.protein / food.cost,
  }));

  // 3. Sort by efficiency
  enrichedFoods.sort((a, b) => b.efficiency - a.efficiency);

  // let totalCost = 0;
  // let totalProtein = 0;
  // let count = 0;
  // let selectedFoods = [];

  const mealTargets = {
    breakfast: targetProtein * 0.3,
    lunch: targetProtein * 0.35,
    dinner: targetProtein * 0.35
  };

  // 4. Greedy selection
  // for (let food of enrichedFoods) {
  //   count = 0;
  //   while (totalCost + food.cost <= budget && count < 2) {
  //     selectedFoods.push(food);
  //     totalCost += food.cost;
  //     totalProtein += food.protein;
  //     count++;
  //   }
  // }

  const usage = {};

  function fillMeal(targetProtein, foods, budgetLeft) {
    let meal = [];
    let protein = 0;
    let cost = 0;

    // for (let food of foods) {
    //   if (usage[food.name] >= 2) continue;
    //   let count = 0;
    //   const used = usage[food.name] || 0;
    //   const penalty = used * 5; // tweak this value
    //   const score = food.efficiency - penalty;

    //   foods.sort((a, b) => {
    //     const scoreA = a.efficiency - (usage[a.name] || 0) * 5;
    //     const scoreB = b.efficiency - (usage[b.name] || 0) * 5;
    //     return scoreB - scoreA;
    //   });

    //   while (
    //     protein < targetProtein &&
    //     cost + food.cost <= budgetLeft &&
    //     count < 1
    //   ) {
    //     meal.push(food);
    //     protein += food.protein;
    //     cost += food.cost;
    //     count++;
    //   }
    // }
    // return { meal, protein, cost };
    while (protein < targetProtein && meal.length < 3) {

      // STEP 1: sort based on updated usage
      // foods.sort((a, b) => {
      //   const scoreA = a.efficiency - (usage[a.name] || 0) * 5;
      //   const scoreB = b.efficiency - (usage[b.name] || 0) * 5;
      //   return scoreB - scoreA;
      // });

      // STEP 2: pick best food AFTER sorting
      // const bestFood = foods[0];
      // const bestFood = foods.find(
      //   (food) => (usage[food.name] || 0) < 2
      // );
      const availableFoods = foods.filter(
        (food) => (usage[food.name] || 0) < 2
      );

      if (availableFoods.length === 0) break;

      availableFoods.sort((a, b) => {
        const scoreA = a.efficiency - (usage[a.name] || 0) * 5;
        const scoreB = b.efficiency - (usage[b.name] || 0) * 5;
        return scoreB - scoreA;
      });

      const bestFood = availableFoods[0];

      if (!bestFood) break;
      const remainingMeals = 2;
      if (cost + bestFood.cost > budgetLeft / remainingMeals) break;

      // STEP 3: add to meal
      meal.push(bestFood);
      protein += bestFood.protein;
      cost += bestFood.cost;

      // STEP 4: update usage
      usage[bestFood.name] = (usage[bestFood.name] || 0) + 1;
    }
    return { meal, protein, cost };
  }
  // 5. Split meals
  // const meals = {
  //   breakfast: selectedFoods.slice(0, 1),
  //   lunch: selectedFoods.slice(1, 3),
  //   dinner: selectedFoods.slice(3),
  // };
  const breakfast = fillMeal(
    mealTargets.breakfast,
    enrichedFoods,
    budget, usage
  );

  const lunch = fillMeal(
    mealTargets.lunch,
    enrichedFoods,
    budget - breakfast.cost, usage
  );

  const dinner = fillMeal(
    mealTargets.dinner,
    enrichedFoods,
    budget - breakfast.cost - lunch.cost, usage
  );


  const meals = {
    breakfast: breakfast.meal,
    lunch: lunch.meal,
    dinner: dinner.meal,
  };

  const totalProtein =
    breakfast.protein + lunch.protein + dinner.protein;

  const totalCost =
    breakfast.cost + lunch.cost + dinner.cost;

  // 6. Insight
  const insight = generateInsight(totalProtein, targetProtein, budget);

  return {
    targetProtein: Math.round(targetProtein),
    achievedProtein: Math.round(totalProtein),
    totalCost,
    meals,
    insight,
    goalMatch: totalProtein >= targetProtein,
  };
}

function generateInsight(achieved, target, budget) {
  if (achieved >= target) {
    return "Plan meets protein goal within budget using efficient food choices.";
  }

  return `Maximized protein under ₹${budget}, but full target (${Math.round(
    target
  )}g) not achievable.`;
}

module.exports = { optimizeMeals };