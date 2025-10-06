# -diteur-d-quation-en-latex
# Éditeur d’équation en LaTeX												
												
Ce projet a pour objectif de générer du code LaTeX à partir des équations entrées par l'utilisateur.												
												
Le rendu LaTeX est inclus dans l’environnement `aligned` et met automatiquement les opérateurs d’alignement `&` et `\\` à chaque nouvelle et fin de ligne.												
												
Le but est de pouvoir écrire de façon simple et rapide le code LaTeX.  												
Pour cela, j’ai créé des raccourcis comme :												
- `/` pour `\div`												
- `*` pour `\times`												
#NOM?												
												
---												
												
## Exemple d’utilisation												
												
**L'utilisateur tape :**												
```												
a * x + b = 0												
a * x  = -b												
x = -b/a 												
```												
												
**Le programme génère automatiquement le code LaTeX suivant :**												
```												
$												
\begin{aligned}												
& a  \times  x + b = 0 \\												
& a  \times  x  = -b \\												
& x = -\cfrac{b}{a} 												
\end{aligned}												
$												

