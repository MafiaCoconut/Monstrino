#!/bin/bash

echo "Enter DOMAIN name (e.g. catalog, collection, media, support, user):"
read DOMAIN_NAME

echo "Enter SERVICE name (e.g. catalog-importer, parser, image-service):"
read SERVICE_NAME

BASE_DIR="docs/microservices/$DOMAIN_NAME/$SERVICE_NAME"

echo "Creating documentation structure:"
echo " → Domain:        $DOMAIN_NAME"
echo " → Microservice:  $SERVICE_NAME"
echo " → Path:          $BASE_DIR"
echo

# Directories
mkdir -p "$BASE_DIR"
mkdir -p "$BASE_DIR/use-cases"
mkdir -p "$BASE_DIR/flows"
mkdir -p "$BASE_DIR/internal-services"
mkdir -p "$BASE_DIR/testing"

#########################################
# MAIN CATEGORY
#########################################
cat > "$BASE_DIR/_category_.json" <<EOF
{
  "label": "$SERVICE_NAME",
  "position": 1,
  "collapsed": true,
  "collapsible": true,
  "className": "monstrino-category",
  "link": {
    "type": "generated-index",
    "title": "$SERVICE_NAME Documentation",
    "description": "Documentation for the $SERVICE_NAME microservice inside the $DOMAIN_NAME domain.",
    "slug": "/$DOMAIN_NAME/microservices/$SERVICE_NAME"
  },
  "customProps": {
    "domain": "$DOMAIN_NAME",
    "service": "$SERVICE_NAME",
    "maintainer": "Monstrino Team",
    "updated": "auto"
  }
}
EOF

#########################################
# INTRO
#########################################
cat > "$BASE_DIR/intro.md" <<EOF
---
title: $SERVICE_NAME Service Overview
description: High-level introduction to the $SERVICE_NAME microservice inside the $DOMAIN_NAME domain.
---

# $SERVICE_NAME

This page introduces the **$SERVICE_NAME** microservice, part of the **$DOMAIN_NAME** domain.

It includes:
- responsibilities  
- use cases  
- flows  
- internal components  
- testing strategy  
EOF

#########################################
# USE CASES
#########################################
cat > "$BASE_DIR/use-cases/_category_.json" <<EOF
{
  "label": "Use Cases",
  "position": 1,
  "collapsed": true,
  "collapsible": true,
  "className": "monstrino-subcategory",
  "link": {
    "type": "generated-index",
    "title": "$SERVICE_NAME — Use Cases",
    "description": "All functional use cases implemented inside the $SERVICE_NAME microservice.",
    "slug": "/$DOMAIN_NAME/microservices/$SERVICE_NAME/use-cases"
  }
}
EOF

cat > "$BASE_DIR/use-cases/overview.md" <<EOF
---
title: Use Cases Overview
---

# Use Cases

This section lists all functional scenarios (use-cases) of the **$SERVICE_NAME** microservice.
EOF

#########################################
# FLOWS
#########################################
cat > "$BASE_DIR/flows/_category_.json" <<EOF
{
  "label": "Flows",
  "position": 2,
  "collapsed": true,
  "collapsible": true,
  "className": "monstrino-subcategory",
  "link": {
    "type": "generated-index",
    "title": "$SERVICE_NAME — Execution Flows",
    "description": "Execution flows, diagrams, and lifecycle steps for the $SERVICE_NAME microservice.",
    "slug": "/$DOMAIN_NAME/microservices/$SERVICE_NAME/flows"
  }
}
EOF

cat > "$BASE_DIR/flows/overview.md" <<EOF
---
title: Execution Flows Overview
---

# Execution Flows

This section provides flow diagrams and lifecycle descriptions for **$SERVICE_NAME**.
EOF

#########################################
# INTERNAL SERVICES
#########################################
cat > "$BASE_DIR/internal-services/_category_.json" <<EOF
{
  "label": "Internal Services",
  "position": 3,
  "collapsed": true,
  "collapsible": true,
  "className": "monstrino-subcategory",
  "link": {
    "type": "generated-index",
    "title": "$SERVICE_NAME — Internal Services",
    "description": "Internal modules, helpers, engines and utilities powering the $SERVICE_NAME microservice.",
    "slug": "/$DOMAIN_NAME/microservices/$SERVICE_NAME/internal-services"
  }
}
EOF

cat > "$BASE_DIR/internal-services/overview.md" <<EOF
---
title: Internal Services Overview
---

# Internal Services

Documentation of internal components of **$SERVICE_NAME**.
EOF

#########################################
# TESTING
#########################################
cat > "$BASE_DIR/testing/_category_.json" <<EOF
{
  "label": "Testing",
  "position": 4,
  "collapsed": true,
  "collapsible": true,
  "className": "monstrino-subcategory",
  "link": {
    "type": "generated-index",
    "title": "$SERVICE_NAME — Testing",
    "description": "Testing strategy, fixtures and test scenarios of the $SERVICE_NAME microservice.",
    "slug": "/$DOMAIN_NAME/microservices/$SERVICE_NAME/testing"
  }
}
EOF

cat > "$BASE_DIR/testing/overview.md" <<EOF
---
title: Testing Overview
---

# Testing

This section contains automated tests, fixtures and edge-case scenarios for **$SERVICE_NAME**.
EOF


echo "Documentation structure for $DOMAIN_NAME / $SERVICE_NAME created successfully!"
