
const {  sql, poolPromise } = require("../config/db");  

exports.getCalls = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT top 5 * FROM Calls");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Database query failed", details: err.message });
  }
};


exports.getSomeCalls = async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT top 5 * FROM Calls where result = 5");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: "Database query failed", details: err.message });
    }
  };
  

  async function getAdmin(eventId, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
      .input("CallID", sql.Int, eventId) 
      .query("select *, P.Name as PositionName from Administrators A  " +
                    "   inner join Calls C on A.AdminID = C.AdministratorID " +
                    " inner join Position P on P.PositionID  = A.PositionID " + 
                    " where C.CallID = @CallID");
                    return result.recordset[0] || null;
    } catch (err) {
      console.error(`❌ Error fetching admin for event ${eventId}:`, err);
    return null;
    }
  }

  exports.getEvents = async (req, res) => {
    try {
      const cDate = new Date();
      const pool = await poolPromise;
      const result = await pool
      .request()
      .input("StartTime", sql.DateTime, cDate) // Input parameter
      
      .execute("GETEVENTS"); // Call stored procedure

      const events = result.recordset;
      for (const event of events) {
        event.Description = "HOsdfsdfPA"
        event.admin = await getAdmin(event.CallID); // Wait for each API call before moving to the next event

      };
      
      
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: "Database query failed", details: err.message });
    }
  };  


  async function getAdminsByCall(callID) {
    try {
      const pool = await poolPromise;

       
      // Query to fetch admins linked to the customer
      const result = await pool
        .request()
        .input("callID", sql.Int, callID)
        .query("select A.Name, A.PhoneRegular, A.PhoneMobile, P.Name as PositionName from Administrators A  " +
                    " inner join Calls C on A.AdminID = C.AdministratorID " +
                    " inner join Position P on P.PositionID  = A.PositionID " + 
                    " where C.CallID = @CallID");
  
      
        return result.recordset; // Return list of admins
    } catch (err) {
      console.error(`❌ Error fetching admins for customer ${customerId}:`, err);
      return []; // Return empty array if error
    }
  }

  async function getNotesByCallId(callID) {
    try {
      const pool = await poolPromise;

       
      // Query to fetch admins linked to the customer
      const result = await pool
        .request()
        .input("callID", sql.Int, callID)
        .query("select * from CallNotes where CallID = @callID order by dateCreated desc");
  
      
        return result.recordset; // Return list of admins
    } catch (err) {
      console.error(`❌ Error fetching admins for customer ${customerId}:`, err);
      return []; // Return empty array if error
    }
  }




  exports.getFatEvents = async (req, res) => {
    try {
      const pool = await poolPromise;
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 2);
      // Fetch all customers
      const result = await pool
      .request()
      .input("StartTime", sql.DateTime, startDate) // Input parameter
      .input("EndTime", sql.DateTime, endDate) // Input parameter
      
      .execute("GETNEWEVENTS"); // Call stored procedure
      const events = result.recordset;
        
      // ✅ Fetch admins for each customer in parallel
      const enrichedCustomers = await Promise.all(
        events.map(async (event) => {
          const admins = await getAdminsByCall(event.CallID); // Get admins for each customer
          const callNotes = await getNotesByCallId(event.CallID); // Get admins for each customer

          for (const callNote of callNotes) {
            callNote.Note = callNote.Note.replace(/<br\s*\/?>/g, "\r\n");
    
          };
  
          return {
            ...event,
            admins, // Attach the list of admins
            callNotes
          };
        })
      );
  
      //console.log(enrichedCustomers); // ✅ Final structured data
      //return enrichedCustomers;
      res.json(enrichedCustomers);
    } catch (err) {
      console.error("❌ Error retrieving customers:", err);
    }
  }