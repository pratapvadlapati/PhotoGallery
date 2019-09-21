var x = {
    "count": 5,
    "images": [
        {
            "caption": "my-uploads2",
            "imagePath": "uploads/image-1568887180409-.jpg"
        },
        {
            "caption": "my-uploads2",
            "imagePath": "uploads/image-1568887184105-.jpg"
        },
        {
            "caption": "my-first-upload",
            "imagePath": "uploads/image-1568887251017-.jpg"
        },
        {
            "caption": "my-first-upload",
            "imagePath": "uploads/image-1568887255354-.jpg"
        },
        {
            "caption": "my-first-upload",
            "imagePath": "uploads/image-1568887319881-.jpg"
        }
    ]
}
console.log(typeof(x))
let img = x.images;
console.log(img.forEach(element => {
    console.log(element.caption);
}))