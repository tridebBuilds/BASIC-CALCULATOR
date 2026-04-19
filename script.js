function Calculator() {
  const [calc, setCalc] = React.useState({
    current: "0",
    total: "0",
    isInitial: true,
    preOp: "",
    expression: "",
  });
  function handleNumber(value) {
    //alert('handle number clicked:'+value);
    let newValue = value;
    if (!calc.isInitial) {
      newValue = calc.current + value;
    }
    setCalc({
      current: newValue,
      total: calc.total,
      isInitial: false,
      preOp: calc.preOp,
      expression: (calc.expression || "") + value,
    });
  }
  function handleOperator(value) {
    const total = doCalculation();
    if (value === "=") {
      setCalc({
        current: total.toString(),
        total: "0",
        isInitial: true,
        preOp: "",
        expression: "" + total, // show result only
      });
      return;
    }

    setCalc({
      current: total.toString(),
      total: total.toString(),
      isInitial: true,
      preOp: value,
      expression: total + " " + value + " ",
    });
  }
  function doCalculation() {
    let total = parseInt(calc.total);
    switch (calc.preOp) {
      case "+":
        total += parseInt(calc.current);
        break;
      case "-":
        total -= parseInt(calc.current);
        break;
      case "*":
        total *= parseInt(calc.current);
        break;
      case "/":
        total /= parseInt(calc.current);
        break;
      default:
        total = parseInt(calc.current);
    }
    return total;
  }
  function renderDisplay() {
    return calc.expression || calc.current;
  }
  function handleClear() {
    setCalc({
      current: "0",
      total: "0",
      isInitial: true,
      preOp: "",
      expression: "",
    });
  }

  return (
    <div className="calculator">
      <div className="display">{renderDisplay()}</div>
      <Calcbtn value="7" onClick={handleNumber} />
      <Calcbtn value="8" onClick={handleNumber} />
      <Calcbtn value="9" onClick={handleNumber} />
      <Calcbtn className=" operator" onClick={handleOperator} value="/" />

      <Calcbtn value="4" onClick={handleNumber} />
      <Calcbtn value="5" onClick={handleNumber} />
      <Calcbtn value="6" onClick={handleNumber} />
      <Calcbtn className="operator" onClick={handleOperator} value="*" />

      <Calcbtn value="1" onClick={handleNumber} />
      <Calcbtn value="2" onClick={handleNumber} />
      <Calcbtn value="3" onClick={handleNumber} />
      <Calcbtn className="operator" onClick={handleOperator} value="-" />
      <Calcbtn value="C" onClick={handleClear} />
      <Calcbtn value="0" onClick={handleNumber} />
      <Calcbtn className="operator" onClick={handleOperator} value="+" />
      <Calcbtn className="operator" onClick={handleOperator} value="=" />
    </div>
  );
}
function Calcbtn(props) {
  return (
    <button
      className={props.className}
      onClick={() => props.onClick(props.value)}
    >
      {props.value}
    </button>
  );
}
ReactDOM.render(
  <div className="app-container">
    <Calculator />{" "}
  </div>,
  document.getElementById("root")
);
