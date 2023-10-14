import defs from "../../data/paramDefs"
import "./DefineParameters.scss"

const DefineParameters = () => {
  return (
    <div className="define-params">
      <h2 className="comp-heading">Parameters definition</h2>
      {defs.map((def, i) => (
        <div className="define-params__item" key={i}>
          <p>
            <b>{def.name}:</b> {def.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default DefineParameters
