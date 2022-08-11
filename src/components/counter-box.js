const CounterBox = ({ title, value }) => {
  return (
    <div className="app__counter_box">
      <div className="counter__title">{title}</div>
      <div className="counter__value">{value}</div>
    </div>
  );
};

export default CounterBox;
