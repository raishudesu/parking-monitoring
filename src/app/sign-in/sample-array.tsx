const books = [
  {
    id: 1,
    name: "LORD",
  },
  {
    id: 2,
    name: "christ",
  },
  {
    id: 3,
    name: "our",
  },
  {
    id: 4,
    name: "amen",
  },
];

const SampleArray = () => {
  return (
    <div>
      {books.map(({ id, name }, index) => (
        <div key={index}>
          <BooksComponent id={id} name={name} />
        </div>
      ))}
    </div>
  );
};

const BooksComponent = ({ id, name }: { id: number; name: string }) => {
  return (
    <>
      <h1 className="font-bold">{id}</h1>
      <p>{name}</p>
    </>
  );
};

export default SampleArray;
