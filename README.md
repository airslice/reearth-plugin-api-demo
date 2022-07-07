# reearth-plugin-api-demo
A plugin demo for test APIs

# What is this
- A simple demo of using plugin API to add layers.
- No front-end framework used. Just pure javascript.

# Some notes of layers API
- `reearth.layers.layers` returns only first level layers with ids, actually it is in a tree stucture so if you want something you need to get them explicitly.
- The layers data is always original data (from database or the initial data when you create). After override layers property you need to merge the layers data with `reearth.layers.overriddenProperties`.
- Some demo of this (like add tileset) can only be added once (just for demo).

# Screenshots

![image](https://user-images.githubusercontent.com/21994748/177690596-dd71cd70-105a-4b05-bbe5-8977fcfc13c6.png)

![image](https://user-images.githubusercontent.com/21994748/177690296-38e17c28-b2f2-4caf-9f28-c218c44624f4.png)
