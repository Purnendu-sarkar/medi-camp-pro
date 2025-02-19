import React from "react";

const MeetOurDoctors = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      image: "https://i.ibb.co.com/Kc1G8bc1/dr-sarah-johnson.jpg",
    },
    {
      name: "Dr. Mark Lee",
      specialty: "Neurologist",
      image: "https://i.ibb.co.com/vf8qky6/marklee300.jpg",
    },
    {
      name: "Dr. Emily Davis",
      specialty: "Pediatrician",
      image:
        "https://i.ibb.co.com/jvrQL7rK/images-q-tbn-ANd9-Gc-Qq06-Ea-ZZer-G8-n-HHvvk-UPG4euov-Fzj-BCLmtw-s.jpg",
    },
  ];

  return (
    <div className="w-full md:w-11/12 mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Meet Our Doctors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h2 className="text-xl font-bold text-gray-700">{doctor.name}</h2>
            <p className="text-gray-500">{doctor.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurDoctors;
