<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cart_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        \Illuminate\Support\Facades\DB::table('cart_statuses')->insert([
            ['id' => 1, 'name' => 'created', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'used', 'created_at' => now(), 'updated_at' => now()],
        ]);

        Schema::table('carts', function (Blueprint $table) {
            $table->unsignedBigInteger('status')->default(1);
            $table->foreign('status')->references('id')->on('cart_statuses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('carts', function (Blueprint $table) {
            $table->dropForeign(['status']);
            $table->dropColumn('status');
        });

        Schema::dropIfExists('cart_statuses');
    }
};
