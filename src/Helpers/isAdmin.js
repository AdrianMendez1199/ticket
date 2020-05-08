import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const USER_QUERY = gql`
 query currentUserIsAdmin {
    currentUserIsAdmin
}`

  
function CheckIsAdmin ()  {
  
   const { loading, error, data } = useQuery(USER_QUERY);

   if(!loading && !error)
    return data.currentUserIsAdmin

  }

export default CheckIsAdmin