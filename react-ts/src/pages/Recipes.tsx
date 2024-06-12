import { useEffect, useState } from "react";
import { RecipeCard } from "../components/RecipeCard";
import { Title } from "../components/Title";
import { TokenRepository } from "../services/TokenRepository";
import "./Recipes.css";

type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
};

type RecipesProps = {
  tokenRepository: TokenRepository;
};

export const Recipes = ({ tokenRepository }: RecipesProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("https://backend-login-placeholder.deno.dev/api/recepies", {
      headers: {
        Authorization: `Bearer ${tokenRepository.find()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          throw new Error(data.code);
        }
        return data.payload;
      })
      .then((recipes) => {
        setRecipes(recipes);
      });
  }, []);

  return (
    <main className="recipes-page">
      <Title>Recipes</Title>
      <div className="recipes">
        {recipes.map((recipe) => (
          <RecipeCard
            name={recipe.name}
            ingredients={recipe.ingredients}
            key={recipe.id}
          />
        ))}
      </div>
    </main>
  );
};