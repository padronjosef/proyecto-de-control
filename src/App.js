import './App.css';
import { useCallback, useMemo, useState } from 'react';
import { Select, Input } from './components'
import imagen from "./imagen.png"

export const App = () => {
  // const balancePoint = C * BC = R * BR

  const [value, setValue] = useState("Carrito")
  const unitToShow = value === "Carrito" || value === "Resistencia" ? " Kg" : " M"

  const [carrito, setCarrito] = useState(20)
  const [brazoCarrito, setBrazoCarrito] = useState(100)
  const [resistencia, setResistencia] = useState(200)
  const [brazoResistencia, setBrazoResistencia] = useState(30)

  const getKG = newton => {
    const formatNewton = parseFloat(newton).toFixed(2)

    const mass = formatNewton / 9.8
    return parseFloat(mass).toFixed(2)
  }

  const fields = useMemo(() => [
    {
      text: "Carrito",
      value: carrito,
      setValue: setCarrito,
      unit: "N",
      rawFormula: ["Resistencia * Brazo de la resistencia", "Brazo del carrito"],
      formula: getKG((resistencia * brazoResistencia) / brazoCarrito)
    },
    {
      text: "Brazo Carrito",
      value: brazoCarrito,
      setValue: setBrazoCarrito,
      unit: "M",
      rawFormula: ["Resistencia * Brazo de la resistencia", "Carrito"],
      formula: (resistencia * brazoResistencia) / carrito
    },
    {
      text: "Resistencia",
      value: resistencia,
      setValue: setResistencia,
      unit: "N",
      rawFormula: ["Carrito * Brazo del carrito ", "Brazo de la resistencia"],
      formula: getKG((carrito * brazoCarrito) / brazoResistencia)
    },
    {
      text: "Brazo Resistencia",
      value: brazoResistencia,
      setValue: setBrazoResistencia,
      unit: "M",
      rawFormula: ["Carrito * Brazo del carrito", "resistencia"],
      formula: (carrito * brazoCarrito) / resistencia
    },
  ], [carrito, brazoCarrito, resistencia, brazoResistencia])

  const result = useCallback(() => {
    const match = fields.find(item => item?.text === value)

    if (match.formula === "0.00") return "Faltan Valores"

    return value + " = " + match.formula + " " + unitToShow
  }, [fields, value, unitToShow])

  const rawFormula = useCallback(() => {
    const match = fields.find(item => item?.text === value)

    return match.rawFormula
  }, [fields, value])

  return (
    <div className="App">
      <div className="wrapper">
        <Select value={value} setValue={setValue} fields={fields} />

        {fields.map((item, key) => <Input key={key} item={item} disabled={value} />)}

        <img src={imagen} alt="imagen" className='imagen' />

        <div className='raw-formula-wrapper'>
          {rawFormula().map(item => <span key={item} className='raw-formula'>{item}</span>)}
        </div>

        <span className='result'>{result()}</span>
      </div>
    </div>
  );
}
