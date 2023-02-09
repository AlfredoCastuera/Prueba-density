type displayProps = {
  value: number
}

const Display = ({ value = 1 }: displayProps) => {
  return (
    <div>{value}</div>
  )
}

export default Display