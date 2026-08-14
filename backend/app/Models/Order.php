<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'cust_id',
        'module_id',
        'status',
        'decline_reason',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'cust_id', 'cust_id');
    }

    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id');
    }
}
