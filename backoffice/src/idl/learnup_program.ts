export type LearnupProgram = {
  "version": "0.1.0",
  "name": "learnup_program",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "infoCourses",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "initCourse",
          "type": {
            "defined": "InitCourse"
          }
        }
      ]
    },
    {
      "name": "createStudent",
      "accounts": [
        {
          "name": "student",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "studentKey",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "refView",
          "type": "string"
        }
      ]
    },
    {
      "name": "createInstructor",
      "accounts": [
        {
          "name": "instructor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "instructorKey",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "refView",
          "type": "string"
        }
      ]
    },
    {
      "name": "createCourse",
      "accounts": [
        {
          "name": "course",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pay",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "instructor",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "courseView",
          "type": "string"
        },
        {
          "name": "courseContent",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addCourse",
      "accounts": [
        {
          "name": "studentCourse",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "course",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "student",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "payCourse",
      "accounts": [
        {
          "name": "course",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "info",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "studentSig",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "studentTk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructorTk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryTk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "course",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instructor",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "courseView",
            "type": "string"
          },
          {
            "name": "courseContent",
            "type": "string"
          },
          {
            "name": "courseAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "instructor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "accountKey",
            "type": "publicKey"
          },
          {
            "name": "refView",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "student",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "accountKey",
            "type": "publicKey"
          },
          {
            "name": "refView",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "studentCourse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "finishedAt",
            "type": "i64"
          },
          {
            "name": "courseKey",
            "type": "publicKey"
          },
          {
            "name": "studentKey",
            "type": "publicKey"
          },
          {
            "name": "amountPay",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "infoCourses",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "percentageTreasury",
            "type": "u64"
          },
          {
            "name": "percentageInstructor",
            "type": "u64"
          },
          {
            "name": "tokenAddress",
            "type": "publicKey"
          },
          {
            "name": "treasuryAddress",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitCourse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "percentageTreasury",
            "type": "u64"
          },
          {
            "name": "percentageInstructor",
            "type": "u64"
          },
          {
            "name": "tokenAddress",
            "type": "publicKey"
          },
          {
            "name": "treasuryAddress",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "CourseCreatedEvent",
      "fields": [
        {
          "name": "course",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "instructor",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TitleTooLong",
      "msg": "The provided title should be 120 characters long maximum."
    },
    {
      "code": 6001,
      "name": "CourseUriTooLong",
      "msg": "The provided content should be 180 characters long maximum."
    }
  ]
};

export const IDL: LearnupProgram = {
  "version": "0.1.0",
  "name": "learnup_program",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "infoCourses",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "initCourse",
          "type": {
            "defined": "InitCourse"
          }
        }
      ]
    },
    {
      "name": "createStudent",
      "accounts": [
        {
          "name": "student",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "studentKey",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "refView",
          "type": "string"
        }
      ]
    },
    {
      "name": "createInstructor",
      "accounts": [
        {
          "name": "instructor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "instructorKey",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "refView",
          "type": "string"
        }
      ]
    },
    {
      "name": "createCourse",
      "accounts": [
        {
          "name": "course",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pay",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "instructor",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "courseView",
          "type": "string"
        },
        {
          "name": "courseContent",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addCourse",
      "accounts": [
        {
          "name": "studentCourse",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "course",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "student",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "payCourse",
      "accounts": [
        {
          "name": "course",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "info",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "studentSig",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "studentTk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instructorTk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryTk",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "course",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instructor",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "courseView",
            "type": "string"
          },
          {
            "name": "courseContent",
            "type": "string"
          },
          {
            "name": "courseAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "instructor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "accountKey",
            "type": "publicKey"
          },
          {
            "name": "refView",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "student",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "accountKey",
            "type": "publicKey"
          },
          {
            "name": "refView",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "studentCourse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "finishedAt",
            "type": "i64"
          },
          {
            "name": "courseKey",
            "type": "publicKey"
          },
          {
            "name": "studentKey",
            "type": "publicKey"
          },
          {
            "name": "amountPay",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "infoCourses",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "percentageTreasury",
            "type": "u64"
          },
          {
            "name": "percentageInstructor",
            "type": "u64"
          },
          {
            "name": "tokenAddress",
            "type": "publicKey"
          },
          {
            "name": "treasuryAddress",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitCourse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "percentageTreasury",
            "type": "u64"
          },
          {
            "name": "percentageInstructor",
            "type": "u64"
          },
          {
            "name": "tokenAddress",
            "type": "publicKey"
          },
          {
            "name": "treasuryAddress",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "CourseCreatedEvent",
      "fields": [
        {
          "name": "course",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "instructor",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TitleTooLong",
      "msg": "The provided title should be 120 characters long maximum."
    },
    {
      "code": 6001,
      "name": "CourseUriTooLong",
      "msg": "The provided content should be 180 characters long maximum."
    }
  ]
};
