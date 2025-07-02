import Spinner from "./Spinner"
export default function LoadingComponent() {
  return (
    <div className="w-full flex items-center justify-center min-h-36">
        <Spinner spinnerClass="h-10 w-10"/>
    </div>
  )
}
