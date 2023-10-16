const courses = [
  {
    id: 1,
    name: "JavaScript Programming Course",
    duration: "60 hours",
    professor: "Maria Silva",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 2,
    name: "Graphic Design Course",
    duration: "50 hours",
    professor: "Carlos Mendes",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 3,
    name: "Digital Marketing Course",
    duration: "45 hours",
    professor: "Ana Ferreira",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 4,
    name: "Professional Photography Course",
    duration: "55 hours",
    professor: "Luís Santos",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 5,
    name: "Project Management Course",
    duration: "70 hours",
    professor: "Eduardo Almeida",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 6,
    name: "Advanced English Course",
    duration: "80 hours",
    professor: "João Oliveira",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 7,
    name: "Personal Finance Course",
    duration: "35 hours",
    professor: "Carla Ribeiro",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 8,
    name: "Content Marketing Course",
    duration: "50 hours",
    professor: "Ricardo Costa",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 9,
    name: "Web Development Course",
    duration: "65 hours",
    professor: "Mariana Santos",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 10,
    name: "Computer Networking Course",
    duration: "55 hours",
    professor: "Carlos Ferreira",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 11,
    name: "Leadership and Team Management Course",
    duration: "60 hours",
    professor: "Fernanda Alves",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 12,
    name: "Social Media Marketing Course",
    duration: "45 hours",
    professor: "Pedro Rodrigues",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 13,
    name: "Introduction to Artificial Intelligence Course",
    duration: "40 hours",
    professor: "Lucas Martins",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 14,
    name: "Digital Art Course",
    duration: "50 hours",
    professor: "Isabel Gonçalves",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 15,
    name: "Data Science Course",
    duration: "75 hours",
    professor: "Felipe Fernandes",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 16,
    name: "Human Resource Management Course",
    duration: "65 hours",
    professor: "Andréa Silva",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 17,
    name: "Entrepreneurship Course",
    duration: "55 hours",
    professor: "Paulo Mendonça",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 18,
    name: "Applied Psychology Course",
    duration: "60 hours",
    professor: "Sandra Pereira",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 19,
    name: "Effective Communication Course",
    duration: "40 hours",
    professor: "Rui Carvalho",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  },
  {
    id: 20,
    name: "Financial Management Course",
    duration: "70 hours",
    professor: "Lúcia Santos",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9quIDmGrMPrGTqYD5KlJGaMjgfuXpoSOJrVBqGMACFlZaHywH4sKl051MBfoPJakLKk&usqp=CAU",
    price: "12,99$"
  }
];

export const methods = {
  create : (course) => {
    courses.push(course)
  },
  getAll: () => courses,
  getByid: (id) => {
    return courses.find(course => course.id === id)
  }
}
  