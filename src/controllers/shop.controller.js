//place controller functions here...

export function getStorePage(req, res) {
    res.render("store", {
        //sending data into ejs
        title: "Miss Atelier",
        heroLine1: "Miss Atelier",
        heroLine2: "Handmade Essentials",
        //nested object
        hero: {
            image: "/images/hero.jpg",
            imageAlt: "Miss Atelier clothing",
            subtitle: "Soft pieces made with care"
        },
        //nested object
        tiles: {
            patterns: {
                image: "/images/patterns.jpg",
                imageAlt: "Patterns"
            },
            yarn: {
                image: "/images/yarn.jpg",
                imageAlt: "Yarn"
            }
        }
    });
}