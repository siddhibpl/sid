var express = require('express')
var router = express.Router()
var mysql = require('mysql');
// mysql connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'itijobs',
  multipleStatements: true
});
// mysql connection
connection.connect(
  function(err, data) {
    if (err) {
      console.log(err);
    }
  });

var date;
date = new Date();
date = date.getUTCFullYear() + '-' +
  ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
  ('00' + date.getUTCDate()).slice(-2);
console.log(date);
//our main Restfull API
router.get('/total', function(req, res, next) {
  connection.query('SELECT COUNT(Name) FROM college; SELECT COUNT(Name) FROM student; SELECT COUNT(Name) FROM company', function(err, result, feild) {
    if (err) {
      return next(err);
    } else {
      if (result != '') {
        console.log(result);
        return res.json({
          "resCode": "OK",
          "Total_ITI": result[0][0]['COUNT(Name)'],
          "Total_Student": result[1][0]['COUNT(Name)'],
          "Total_Company": result[2][0]['COUNT(Name)']
        });
      } else {
        return res.json({
          "resCode": "Error",
          "msg": "Error Register"
        });
      }
    }
  });
});

router.get('/getTradeLists', function(req, res, next) {
  connection.query('SELECT * FROM tradelist', function(err, result, feild) {
    if (err) {
      return next(err);
    } else {
      if (result != '') {
        console.log(result);
        return res.json({
          "resCode": "OK",
          "results": result
          // "trade": result.trade
        });
      } else {
        return res.json({
          "resCode": "Error",
          "msg": "Trade List is empty"
        });
      }
    }
  });
});

router.get('/getCollegeLists', function(req, res, next) {
  connection.query('SELECT * FROM collegenamelist', function(err, result, feild) {
    if (err) {
      return next(err);
    } else {
      if (result != '') {
        console.log(result);
        return res.json({
          "resCode": "OK",
          "results": result
          // "trade": result.trade
        });
      } else {
        return res.json({
          "resCode": "Error",
          "msg": "College List is empty"
        });
      }
    }
  });
});

router.get('/getExperienceLists', function(req, res, next) {
  connection.query('SELECT * FROM experiencelist', function(err, result, feild) {
    if (err) {
      return next(err);
    } else {
      if (result != '') {
        console.log(result);
        return res.json({
          "resCode": "OK",
          "results": result
          // "trade": result.trade
        });
      } else {
        return res.json({
          "resCode": "Error",
          "msg": "Experience List is empty"
        });
      }
    }
  });
});

router.post('/getCollegeWiseTradeLists', function(req, res, next) {
  console.log("getCollegeWiseTradeLists>>>>>",req.body);
  connection.query('SELECT * FROM collegewisetrade where (Name) = "' + req.body.Name + '"', function(err, result, feild) {
    if (err) {
      return next(err);
    } else {
      if (result != '') {
        console.log(result);
        return res.json({
          "resCode": "OK",
          "results": result
          // "trade": result.trade
        });
      } else {
        return res.json({
          "resCode": "Error",
          "msg": "This College Trades List empty"
        });
      }
    }
  });
});

router.post('/login', function(req, res, next) {
  var x = req.body.username;
  var y = req.body.password;
  console.log(x, ".................", y);
  connection.query('SELECT * FROM login WHERE User = "' + x + '" and Pass = "' + y + '"', function(err, result) {
    if (err) {
      return next(err);
    } else {
      if (result != '') {
        console.log(result[0]);
        return res.json({
          "resCode": "OK",
          "msg": "Validation successful!",
          "role": result[0].Role,
          "name": result[0].Name,
          "number": result[0].User
        });
      } else {
        return res.json({
          "resCode": "Error",
          "msg": "User Not Valid!"
        });
      }
    }
  });
});

router.post("/logout", function(req, res, next) {
  return res.json({
    "resCode": "OK",
    "msg": "logging out"
  });
});

router.post("/newAdmin", function(req, res, next) {
  console.log(req.body);
  if (req.body.Key == "Edit") {
    console.log("EDIT");
    var sql = 'UPDATE admin SET Name = "' + req.body.Name + '",Email ="' + req.body.Email + '", Address ="' + req.body.Address + '",City = "' + req.body.City + '", Pincode = "' + req.body.Pincode + '" WHERE (Mobile)="' + req.body.Mobile + '"; UPDATE login SET Name = "' + req.body.Name + '" WHERE (User)="' + req.body.Mobile + '"';
    connection.query(sql, function(err, result) {
      if (err) {
        return console.log(err);
      } else {
        return res.json({
          "resCode": "OK",
          "msg": "Update Details successfully!"
        });
      }
    });
  } else {
    connection.query('SELECT * FROM login WHERE User = "' + req.body.Mobile + '"', function(err, result) {
      if (err) {
        return next(err);
      } else {
        if (result == '') {
          connection.query('SELECT * FROM admin WHERE Name = "' + req.body.Name + '" AND ( City = "' + req.body.City + '" OR Pincode = "' + req.body.Pincode + '")', function(err, result1) {
            if (err) {
              return next(err);
            } else {
              if (result1 != '') {
                console.log(result1);
                return res.json({
                  "resCode": "Error",
                  "msg": "User Already Register"
                });
              } else {
                connection.query('INSERT INTO admin (Name,Email,Mobile,Address,City,Pincode,Date) VALUES ("' + req.body.Name + '","' + req.body.Email + '","' + req.body.Mobile + '","' + req.body.Address + '","' + req.body.City + '","' + req.body.Pincode + '","' + date + '"); INSERT INTO login VALUES( "Admin","' + req.body.Mobile + '", "12345", "' + req.body.Name + '","' + date + '")', function(err, result2) {
                  if (err) {
                    return next(err);
                  } else {
                    console.log("result2New");
                    return res.json({
                      "resCode": "OK",
                      "msg": "New Admin Register"
                    });
                  }
                });
              }
            }
          });

        } else {
          return res.json({
            "resCode": "Error",
            "msg": "Mobile Number Already Register"
          });
        }
      }
    });
  }
});

router.post("/newStudent", function(req, res, next) {
  console.log(req.body);
  connection.query('SELECT * FROM login WHERE User = "' + req.body.Mobile + '"', function(err, result) {
    if (err) {
      return next(err);
    } else {
      if (result == '') {
        connection.query('SELECT * FROM student WHERE Name = "' + req.body.Name + '" AND ( City = "' + req.body.City + '" OR Pincode = "' + req.body.Pincode + '")', function(err, result1) {
          if (err) {
            return next(err);
          } else {
            if (result1 != '') {
              console.log(result1);
              return res.json({
                "resCode": "Error",
                "msg": "User Already Register"
              });
            } else {
              var sql = 'INSERT INTO student(Name,Father,Mother,Email,Dob,Sex,Address,City,State,Pincode,Mobile,College,Trade,POY,Per,HSPer,Job,Experience,LastComp,ExpYear,Date) VALUES ("' + req.body.Name + '","' + req.body.Father + '","' + req.body.Mother + '","' + req.body.Email + '","' + req.body.Dob + '","' + req.body.Sex + '","' + req.body.Address + '","' + req.body.City + '","' + req.body.State + '","' + req.body.Pincode + '","' + req.body.Mobile + '","' + req.body.College + '","' + req.body.Trade + '","' + req.body.POY + '","' + req.body.Per + '","' + req.body.HSPer + '","' + req.body.Job + '","' + req.body.Experience + '","' + req.body.LastComp + '","' + req.body.ExpYear + '","' + date + '");INSERT INTO login VALUES( "Student","' + req.body.Mobile + '", "12345", "' + req.body.Name + '", "' + date + '")';
              connection.query(sql, function(err, result2) {
                if (err) {
                  return next(err);
                } else {
                  console.log("result2");
                  return res.json({
                    "resCode": "OK",
                    "msg": "New Student Register"
                  });
                }
              });
            }
          }
        });

      } else {
        return res.json({
          "resCode": "Error",
          "msg": "Mobile Number Already Register"
        });
      }
    }
  });
});

router.post("/newCompany", function(req, res, next) {
  console.log(req.body);
  if (req.body.Key == "Edit") {
    console.log("EDIT");
    var sql = 'UPDATE company SET Name = "' + req.body.Name + '",Registration = "' + req.body.Registration + '",Landline = "' + req.body.Landline + '",Email = "' + req.body.Email + '",Website = "' + req.body.Website + '",YOI = "' + req.body.YOI + '", Address ="' + req.body.Address + '",City = "' + req.body.City + '",State = "' + req.body.State + '",District ="' + req.body.District + '", Pincode = "' + req.body.Pincode + '", HR_Name = "' + req.body.HR_Name + '", HR_Email = "' + req.body.HR_Email + '", Logo = "' + req.body.Logo + '" WHERE (HR_Mobile)="' + req.body.HR_Mobile + '"; UPDATE login SET Name = "' + req.body.Name + '" WHERE (User)="' + req.body.HR_Mobile + '"';
    connection.query(sql, function(err, result) {
      if (err) {
        return console.log(err);
      } else {
        return res.json({
          "resCode": "OK",
          "msg": "Update Details successfully!"
        });
      }
    });
  } else {
    connection.query('SELECT * FROM login WHERE User = "' + req.body.HR_Mobile + '"', function(err, result) {
      if (err) {
        return next(err);
      } else {
        if (result == '') {
          connection.query('SELECT * FROM company WHERE Name = "' + req.body.Name + '" AND ( City = "' + req.body.City + '" OR Pincode = "' + req.body.Pincode + '")', function(err, result1) {
            if (err) {
              return next(err);
            } else {
              if (result1 != '') {
                console.log(result1);
                return res.json({
                  "resCode": "Error",
                  "msg": "User Already Register"
                });
              } else {
                var sql = 'INSERT INTO company(Name,Registration,Landline,Email,Website,YOI,Address,City,State,Pincode,District,HR_Name,HR_Email,HR_Mobile,Logo,Date) VALUES ("' + req.body.Name + '","' + req.body.Registration + '","' + req.body.Landline + '","' + req.body.Email + '","' + req.body.Website + '","' + req.body.YOI + '","' + req.body.Address + '","' + req.body.City + '","' + req.body.State + '","' + req.body.Pincode + '","' + req.body.District + '","' + req.body.HR_Name + '","' + req.body.HR_Email + '","' + req.body.HR_Mobile + '","' + req.body.Logo + '","' + date + '");INSERT INTO login VALUES( "Company","' + req.body.HR_Mobile + '", "12345", "' + req.body.Name + '", "' + date + '")';
                connection.query(sql, req.body, function(err, result2) {
                  if (err) {
                    return next(err);
                  } else {
                    // connection.query('INSERT INTO login VALUES( "Company","' + req.body.HR_Mobile + '", "12345", "' + req.body.Name + '")', function(err, result3) {
                    console.log("result3");
                    return res.json({
                      "resCode": "OK",
                      "msg": "New Company Register"
                    });
                    // });
                  }
                });
              }
            }
          });

        } else {
          return res.json({
            "resCode": "Error",
            "msg": "Mobile Number Already Register"
          });
        }
      }
    });
  }
});

router.post("/newIti", function(req, res, next) {
  console.log(req.body);
  if (req.body.Key == "Edit") {
    console.log("EDIT");
    var sql = 'UPDATE company SET Name = "' + req.body.Name + '",Registration = "' + req.body.Registration + '",Landline = "' + req.body.Landline + '",Email = "' + req.body.Email + '",Website = "' + req.body.Website + '",YOI = "' + req.body.YOI + '", Address ="' + req.body.Address + '",City = "' + req.body.City + '",State = "' + req.body.State + '",District ="' + req.body.District + '", Pincode = "' + req.body.Pincode + '", HR_Name = "' + req.body.HR_Name + '", HR_Email = "' + req.body.HR_Email + '", Logo = "' + req.body.Logo + '" WHERE (HR_Mobile)="' + req.body.HR_Mobile + '"; UPDATE login SET Name = "' + req.body.Name + '" WHERE (User)="' + req.body.HR_Mobile + '"';
    connection.query(sql, function(err, result) {
      if (err) {
        return console.log(err);
      } else {
        return res.json({
          "resCode": "OK",
          "msg": "Update Details successfully!"
        });
      }
    });
  } else {
  connection.query('SELECT * FROM login WHERE User = "' + req.body.TPO_Mobile + '"', function(err, result) {
    if (err) {
      return next(err);
    } else {
      if (result == '') {
        connection.query('SELECT * FROM college WHERE Name = "' + req.body.Name + '" AND ( City = "' + req.body.City + '" OR Pincode = "' + req.body.Pincode + '")', function(err, result1) {
          if (err) {
            return next(err);
          } else {
            if (result1 != '') {
              console.log(result1);
              return res.json({
                "resCode": "Error",
                "msg": "User Already Register"
              });
            } else {
              connection.query('INSERT INTO college(Name,Registration,Landline,Email,Mobile,Type,Address,City,State,Pincode,District,TPO_Name,TPO_Email,TPO_Mobile,Logo,Date) VALUES ("' + req.body.Name + '","' + req.body.Registration + '","' + req.body.Landline + '","' + req.body.Email + '","' + req.body.Mobile + '","' + req.body.Type + '","' + req.body.Address + '","' + req.body.City + '","' + req.body.State + '","' + req.body.Pincode + '","' + req.body.District + '","' + req.body.TPO_Name + '","' + req.body.TPO_Email + '","' + req.body.TPO_Mobile + '","' + req.body.Logo + '","' + date + '")', function(err, result2) {
                if (err) {
                  return next(err);
                } else {
                  console.log("result2");
                  connection.query('INSERT INTO login VALUES( "College","' + req.body.TPO_Mobile + '", "12345", "' + req.body.Name + '","' + date + '");INSERT INTO collegenamelist (Name) VALUES("' + req.body.Name + '")', function(err, result3) {
                    if (err) {
                      return next(err);
                    } else {
                      console.log("result3");
                      var trade = JSON.parse(req.body.Trade);
                      trade.forEach(function(x) {
                        connection.query('INSERT INTO collegewisetrade (Name,Trade) VALUES("' + req.body.Name + '","' + x + '")', function(err, result4) {
                          if (err) {
                            return next(err);
                          } else {
                            console.log("------");
                          }
                        });
                      });
                      return res.json({
                        "resCode": "OK",
                        "msg": "New ITI College Register"
                      });
                    }
                  });
                }
              });
            }
          }
        });

      } else {
        return res.json({
          "resCode": "Error",
          "msg": "Mobile Number Already Register"
        });
      }
    }
  });
}
});

router.post('/aboutMe', function(req, res, next) {
  console.log(req.body.Role);
  switch (req.body.Role) {
    case "Admin":
      console.log("Admin");
      connection.query('SELECT * FROM admin where (Name) = "' + req.body.Name + '" AND (Mobile) = "' + req.body.Number + '"', function(err, result, feild) {
        if (err) {
          return next(err);
        } else {
          if (result != '') {
            console.log(result);
            return res.json({
              "resCode": "OK",
              "results": result
            });
          } else {
            return res.json({
              "resCode": "Error",
              "msg": "Information Not existing"
            });
          }
        }
      });
      break;
    case "Student":
      console.log("Student");
      connection.query('SELECT * FROM student where (Name) = "' + req.body.Name + '" AND (Mobile) = "' + req.body.Number + '"', function(err, result, feild) {
        if (err) {
          return next(err);
        } else {
          if (result != '') {
            console.log(result[0].ExpYear);
            console.log(result);
            connection.query('SELECT experience FROM experiencelist where (Id) = "' + result[0].ExpYear + '"', function(err, result1, feild) {
              if (err) {
                return next(err);
              } else {
                console.log(result1);
                if (result[0].ExpYear != 'NA') {
                  result[0].ExpYear = result1[0].experience;
                }
                return res.json({
                  "resCode": "OK",
                  "results": result
                });
              }
            });
          } else {
            return res.json({
              "resCode": "Error",
              "msg": "Information Not existing"
            });
          }
        }
      });
      break;
    case "College":
      console.log("College");
      connection.query('SELECT * FROM college where (Name) = "' + req.body.Name + '" AND (TPO_Mobile) = "' + req.body.Number + '"', function(err, result, feild) {
        if (err) {
          return next(err);
        } else {
          if (result != '') {
            console.log(result);
            return res.json({
              "resCode": "OK",
              "results": result
            });
          } else {
            return res.json({
              "resCode": "Error",
              "msg": "This College Data empty Now"
            });
          }
        }
      });
      break;
    case "Company":
      console.log("Company");
      connection.query('SELECT * FROM company where (Name) = "' + req.body.Name + '" AND (HR_Mobile) = "' + req.body.Number + '"', function(err, result, feild) {
        if (err) {
          return next(err);
        } else {
          if (result != '') {
            console.log(result);
            return res.json({
              "resCode": "OK",
              "results": result
            });
          } else {
            return res.json({
              "resCode": "Error",
              "msg": "This College Trades List empty"
            });
          }
        }
      });
      break;
    default:
      console.log("Role Is Not Present");
  }
});

router.get('/totalCompany', function(req, res, next) {
  connection.query('SELECT * FROM company', function(err, result, feild) {
    if (err) {
      return next(err);
    } else {
      if (result != '') {
        console.log(result);
        return res.json({
          "resCode": "OK",
          "results": result
        });
      } else {
        return res.json({
          "resCode": "Error",
          "msg": "No Company Available in Database"
        });
      }
    }
  });
});

router.post('/viewMoreCompanyByName', function(req, res, next) {
  connection.query('SELECT * FROM company where (Name) = "' + req.body.Name + '"', function(err, result, feild) {
    if (err) {
      return next(err);
    } else {
      if (result != '') {
        console.log(result);
        return res.json({
          "resCode": "OK",
          "results": result
        });
      } else {
        return res.json({
          "resCode": "Error",
          "msg": "Company Not Available in Database"
        });
      }
    }
  });
});

router.get('/totalCollege', function(req, res, next) {
  connection.query('SELECT * FROM college', function(err, result, feild) {
    if (err) {
      return next(err);
    } else {
      if (result != '') {
        console.log(result);
        return res.json({
          "resCode": "OK",
          "results": result
        });
      } else {
        return res.json({
          "resCode": "Error",
          "msg": "No College Available in Database"
        });
      }
    }
  });
});

router.post('/viewMoreCollegeByName', function(req, res, next) {
  connection.query('SELECT * FROM college where (Name) = "' + req.body.Name + '"', function(err, result, feild) {
    if (err) {
      return next(err);
    } else {
      if (result != '') {
        console.log(result);
        return res.json({
          "resCode": "OK",
          "results": result
        });
      } else {
        return res.json({
          "resCode": "Error",
          "msg": "College Not Available in Database"
        });
      }
    }
  });
});

router.post('/studentTradeWiseFilter', function(req, res, next) {
  console.log(req.body.Role);
  switch (req.body.Role) {
    case "College":
      console.log("College");
      connection.query('SELECT * FROM student where (College) = "' + req.body.Name + '" AND (Trade) = "' + req.body.Trade + '" AND (Experience) = "' + req.body.Experience + '" AND (ExpYear) = "' + req.body.ExpYear + '"', function(err, result, feild) {
        if (err) {
          return next(err);
        } else {
          if (result != '') {
            console.log(result);
            return res.json({
              "resCode": "OK",
              "results": result
            });
          } else {
            return res.json({
              "resCode": "Error",
              "msg": "Sorry Students List Not Available For This Input, Try With New Input!"
            });
          }
        }
      });
      break;
    default:
      console.log("Not College");
      connection.query('SELECT * FROM student where (Trade) = "' + req.body.Trade + '" AND (Experience) = "' + req.body.Experience + '" AND (ExpYear) = "' + req.body.ExpYear + '"', function(err, result, feild) {
        if (err) {
          return next(err);
        } else {
          if (result != '') {
            console.log(result);
            return res.json({
              "resCode": "OK",
              "results": result
            });
          } else {
            return res.json({
              "resCode": "Error",
              "msg": "Sorry Students List Not Available For This Input, Try With New Input!"
            });
          }
        }
      });
  }
});

router.post('/viewMoreStudentByName', function(req, res, next) {
  console.log(req.body);
  connection.query('SELECT * FROM student where (Name) = "' + req.body.Name + '"', function(err, result, feild) {
    if (err) {
      return next(err);
    } else {
      if (result != '') {
        console.log(result);
        return res.json({
          "resCode": "OK",
          "results": result
        });
      } else {
        return res.json({
          "resCode": "Error",
          "msg": "Student Not Available in Database"
        });
      }
    }
  });
});

router.post('/contactUs', function(req, res, next) {
  console.log(req.body);
  // connection.query('SELECT * FROM student where (Name) = "' + req.body.Name + '"', function(err, result, feild) {
  // if (err) {
  //   return next(err);
  // } else {
  //   if (result != '') {
  //     console.log(result);
  return res.json({
    "resCode": "OK",
    "results": "We will send response Your Query!Thanks for Contact Us"
    //       });
    //     } else {
    //       return res.json({
    //         "resCode": "Error",
    //         "msg": "Student Not Available in Database"
    //       });
    //     }
    //   }
  });
});

module.exports = router;
